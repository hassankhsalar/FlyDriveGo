import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  MessageSquare,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import {
  Button,
  Typography,
  Chip,
  CircularProgress,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip
} from '@mui/material';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const VisaStatus = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosPublic.get('/visa-applications', {
          params: { email: user.email }
        });
        console.log('Fetched applications:', response.data);
        setApplications(response.data);
      } catch (err) {
        console.error('Error fetching visa applications:', err);
        setError('Failed to load your visa applications. Please try again later.');
        toast.error('Failed to load visa applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user, axiosPublic]);

  // Filter applications based on search query
  const filteredApplications = applications.filter(app =>
    app._id?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.countryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.visaTypeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.referenceNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleMessageSubmit = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      const messageData = {
        text: message,
        userId: user.uid,
        userName: user.displayName,
        createdAt: new Date().toISOString()
      };

      await axiosPublic.post(`/visa-applications/${selectedApplication._id}/messages`, messageData);

      toast.success('Message sent successfully');
      setMessage('');
      setMessageDialogOpen(false);

      // Update the selected application with the new message
      setSelectedApplication({
        ...selectedApplication,
        messages: [...(selectedApplication.messages || []), messageData]
      });

      // Refresh applications to show the new message
      const response = await axiosPublic.get('/visa-applications', {
        params: { email: user.email }
      });
      setApplications(response.data);
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message');
    }
  };

  const handleDownloadApprovalLetter = async () => {
    if (!selectedApplication) return;

    try {
      toast.loading("Preparing approval letter...");
      if (selectedApplication.approvalLetterUrl) {
        const response = await fetch(selectedApplication.approvalLetterUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch approval letter");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Approval_Letter_${selectedApplication.referenceNumber || selectedApplication._id}.pdf`);
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        toast.dismiss();
        toast.success("Approval letter downloaded successfully");
      } else {
        const response = await axiosPublic.get(`/visa-applications/${selectedApplication._id}/approval-letter`, {
          responseType: 'blob'
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Approval_Letter_${selectedApplication.referenceNumber || selectedApplication._id}.pdf`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        toast.dismiss();
        toast.success("Approval letter downloaded successfully");
      }
    } catch (error) {
      console.error('Error downloading approval letter:', error);
      toast.dismiss();
      toast.error("Failed to download approval letter");
    }
  };

  const handleViewDocument = (doc) => {
    const url = typeof doc === 'object' ? doc.url : doc;
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error("Document URL is invalid");
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'pending':
        return <Chip icon={<Clock size={14} />} label="Pending" color="warning" size="small" />;
      case 'processing':
        return <Chip icon={<Clock size={14} />} label="Processing" color="info" size="small" />;
      case 'approved':
        return <Chip icon={<CheckCircle size={14} />} label="Approved" color="success" size="small" />;
      case 'rejected':
        return <Chip icon={<XCircle size={14} />} label="Rejected" color="error" size="small" />;
      case 'additional_info_needed':
        return <Chip icon={<AlertTriangle size={14} />} label="Additional Info Needed" color="secondary" size="small" />;
      default:
        return <Chip label={status || 'Unknown'} size="small" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Generate application timeline based on status
  const getApplicationTimeline = (application) => {
    const timeline = [
      {
        date: application.submissionDate || application.createdAt,
        status: 'Application Submitted',
        description: 'Your application has been received by our team.',
        icon: <FileText size={20} className="text-primary" />
      }
    ];
    if (['processing', 'approved', 'rejected', 'additional_info_needed'].includes(application.status)) {
      timeline.push({
        date: application.processingDate || new Date(new Date(application.submissionDate || application.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'Application Processing',
        description: 'Our visa specialists are reviewing your application.',
        icon: <Clock size={20} className="text-info" />
      });
    }

    if (application.status === 'approved') {
      timeline.push({
        date: application.approvalDate || new Date(new Date(application.submissionDate || application.createdAt).getTime() + 72 * 60 * 60 * 1000).toISOString(),
        status: 'Application Approved',
        description: 'Congratulations! Your visa application has been approved.',
        icon: <CheckCircle size={20} className="text-success" />
      });
    } else if (application.status === 'rejected') {
      timeline.push({
        date: application.rejectionDate || new Date(new Date(application.submissionDate || application.createdAt).getTime() + 72 * 60 * 60 * 1000).toISOString(),
        status: 'Application Rejected',
        description: application.rejectionReason || 'Unfortunately, your visa application has been rejected.',
        icon: <XCircle size={20} className="text-error" />
      });
    } else if (application.status === 'additional_info_needed') {
      timeline.push({
        date: application.additionalInfoRequestDate || new Date(new Date(application.submissionDate || application.createdAt).getTime() + 48 * 60 * 60 * 1000).toISOString(),
        status: 'Additional Information Requested',
        description: application.additionalInfoRequest || 'We need additional information to process your application.',
        icon: <AlertTriangle size={20} className="text-warning" />
      });
    }
    return timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-SmokeWhite p-8 flex items-center justify-center">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-SmokeWhite p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <HelpCircle size={48} className="mx-auto text-primary mb-4" />
          <Typography variant="h5" gutterBottom className="font-red-rose">Please Sign In</Typography>
          <Typography variant="body1" className="mb-6 font-poppins">
            You need to be signed in to view your visa applications.
          </Typography>
          <Button variant="contained" color="primary" href="/login" className="font-poppins">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-SmokeWhite p-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-red-rose font-bold text-CharcoleDark">
                Your Visa Applications
              </h1>
              <p className="text-gray-600 font-poppins">
                Track the status of your visa applications
              </p>
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full md:w-auto">
              <Search className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search applications..."
                className="bg-transparent border-none outline-none w-full font-poppins"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <Alert severity="error" className="mb-6">
              {error}
            </Alert>
          )}

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <Typography variant="h5" className="text-gray-700 mb-2 font-red-rose">No Applications Found</Typography>
              <Typography variant="body1" className="text-gray-500 mb-6 font-poppins">
                You haven't submitted any visa applications yet.
              </Typography>
              <Button variant="contained" color="primary" href="/visa-assistance" className="font-poppins">
                Apply for a Visa
              </Button>
            </div>
          ) : (
            <>
              <TableContainer component={Paper} className="mb-8 rounded-xl overflow-hidden">
                <Table>
                  <TableHead className="bg-gray-50">
                    <TableRow>
                      <TableCell><strong>Reference</strong></TableCell>
                      <TableCell><strong>Destination</strong></TableCell>
                      <TableCell><strong>Visa Type</strong></TableCell>
                      <TableCell><strong>Submission Date</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                      <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application._id} hover>
                        <TableCell>
                          {application.referenceNumber ||
                            (application._id ? application._id.toString().substring(0, 8) + '...' : 'N/A')}
                        </TableCell>
                        <TableCell>{application.countryName || application.destinationCountry}</TableCell>
                        <TableCell>{application.visaTypeName || application.visaType}</TableCell>
                        <TableCell>{formatDate(application.submissionDate || application.createdAt)}</TableCell>
                        <TableCell>{getStatusChip(application.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleViewDetails(application)}
                            className="font-poppins"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <div className="bg-primary bg-opacity-10 rounded-xl p-6">
                <Typography variant="h6" className="font-bold mb-4 text-primary font-red-rose">
                  Need Help?
                </Typography>
                <Typography variant="body1" className="mb-4 font-poppins">
                  Our visa specialists are available to assist you with any questions or concerns regarding your application.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outlined" href="/faq" className="font-poppins">
                    View FAQs
                  </Button>
                  <Button variant="contained" color="primary" href="/contact" className="font-poppins">
                    Contact Support
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Application Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              <div className="flex justify-between items-center">
                <Typography variant="h6" className="font-bold font-red-rose">
                  Visa Application Details
                </Typography>
                {getStatusChip(selectedApplication.status)}
              </div>
              
            </DialogTitle>
            <DialogContent dividers>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Typography variant="subtitle1" className="font-semibold mb-2 font-red-rose">
                    Application Summary
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-poppins">
                    <div>
                      <Typography variant="body2" className="text-gray-500">Reference ID</Typography>
                      <Typography variant="body1">
                        {selectedApplication.referenceNumber || selectedApplication._id}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500">Submission Date</Typography>
                      <Typography variant="body1">{formatDate(selectedApplication.submissionDate || selectedApplication.createdAt)}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500">Applicant Name</Typography>
                      <Typography variant="body1">{selectedApplication.fullName}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500">Passport Number</Typography>
                      <Typography variant="body1">{selectedApplication.passportNumber}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500">Destination</Typography>
                      <Typography variant="body1">{selectedApplication.countryName || selectedApplication.destinationCountry}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500">Visa Type</Typography>
                      <Typography variant="body1">{selectedApplication.visaTypeName || selectedApplication.visaType}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500">Travel Date</Typography>
                      <Typography variant="body1">{formatDate(selectedApplication.travelDate)}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500">Return Date</Typography>
                      <Typography variant="body1">{formatDate(selectedApplication.returnDate)}</Typography>
                    </div>
                  </div>
                </div>

                <Divider />

                <div>
                  <Typography variant="subtitle1" className="font-semibold mb-3 font-red-rose">
                    Application Timeline
                  </Typography>
                  <div className="space-y-4 font-poppins">
                    {getApplicationTimeline(selectedApplication).map((item, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4">
                          <div className="bg-primary bg-opacity-10 p-2 rounded-full">
                            {item.icon}
                          </div>
                          {index < getApplicationTimeline(selectedApplication).length - 1 && (
                            <div className="h-full w-0.5 bg-gray-200 mx-auto my-1"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Typography variant="subtitle2" className="font-semibold">
                              {item.status}
                            </Typography>
                            <Typography variant="caption" className="text-gray-500">
                              {formatDate(item.date)}
                            </Typography>
                          </div>
                          <Typography variant="body2" className="text-gray-600 mb-2">
                            {item.description}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedApplication.status === 'additional_info_needed' && (
                  <Alert severity="warning" className="mb-4">
                    <Typography variant="subtitle2" className="font-semibold font-red-rose">
                      Additional Information Required
                    </Typography>
                    <Typography variant="body2" className="font-poppins">
                      {selectedApplication.additionalInfoRequest ||
                        "Our visa specialists need additional information to process your application. Please check your messages or contact our support team."}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      className="mt-2 font-poppins"
                      onClick={() => setMessageDialogOpen(true)}
                    >
                      Send Message
                    </Button>
                  </Alert>
                )}

                {selectedApplication.documents && selectedApplication.documents.length > 0 && (
                  <>
                    <Divider />
                    <div>
                      <Typography variant="subtitle1" className="font-semibold mb-2 font-red-rose">
                        Uploaded Documents
                      </Typography>
                      <div className="flex flex-wrap gap-3 font-poppins">
                        {selectedApplication.documents.map((doc, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-2 flex flex-col items-center">
                            <div className="text-center mb-2 max-w-[150px] truncate">
                              <Tooltip title={typeof doc === 'string' ? doc : (doc.name || 'Document')}>
                                <Typography variant="body2" className="truncate">
                                  {typeof doc === 'string' ? doc : (doc.name || 'Document')}
                                </Typography>
                              </Tooltip>
                            </div>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => handleViewDocument(doc)}
                              startIcon={<ExternalLink size={16} />}
                              className="font-poppins"
                            >
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedApplication.additionalRequirements && (
                  <>
                    <Divider />
                    <div>
                      <Typography variant="subtitle1" className="font-semibold mb-2 font-red-rose">
                        Additional Requirements
                      </Typography>
                      <Paper variant="outlined" className="p-3">
                        <Typography variant="body2" className="font-poppins">
                          {selectedApplication.additionalRequirements}
                        </Typography>
                      </Paper>
                    </div>
                  </>
                )}

                {selectedApplication.adminNotes && (
                  <>
                    <Divider />
                    <div>
                      <Typography variant="subtitle1" className="font-semibold mb-2 font-red-rose">
                        Notes from Visa Specialist
                      </Typography>
                      <Paper variant="outlined" className="p-3">
                        <Typography variant="body2" className="font-poppins">
                          {selectedApplication.adminNotes}
                        </Typography>
                      </Paper>
                    </div>
                  </>
                )}

                <Divider />

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Typography variant="subtitle1" className="font-semibold font-red-rose">
                      Messages
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<MessageSquare size={16} />}
                      onClick={() => setMessageDialogOpen(true)}
                      className="font-poppins"
                    >
                      New Message
                    </Button>
                  </div>

                  {selectedApplication.messages && selectedApplication.messages.length > 0 ? (
                    <div className="space-y-3 font-poppins">
                      {selectedApplication.messages.map((msg, index) => (
                        <Paper key={index} variant="outlined" className="p-3">
                          <div className="flex justify-between items-start mb-1">
                            <Typography variant="subtitle2" className="font-semibold">
                              {msg.userName || 'User'}
                            </Typography>
                            <Typography variant="caption" className="text-gray-500">
                              {formatDate(msg.createdAt)}
                            </Typography>
                          </div>
                          <Typography variant="body2">
                            {msg.text}
                          </Typography>
                        </Paper>
                      ))}
                    </div>
                  ) : (
                    <Typography variant="body2" className="text-gray-500 italic font-poppins">
                      No messages yet. Use the button above to send a message to our visa specialists.
                    </Typography>
                  )}
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} className="font-poppins">Close</Button>
              {selectedApplication.status === 'approved' && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FileText size={16} />}
                  onClick={handleDownloadApprovalLetter}
                  className="font-poppins"
                >
                  Download Approval Letter
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Message Dialog */}
      <Dialog
        open={messageDialogOpen}
        onClose={() => setMessageDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" className="font-semibold font-red-rose">
            Send Message to Visa Specialist
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" className="mb-4 font-poppins">
            Your message will be sent to our visa specialists who are handling your application.
          </Typography>
          <TextField
            label="Your Message"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="font-poppins"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialogOpen(false)} className="font-poppins">Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMessageSubmit}
            disabled={!message.trim()}
            className="font-poppins"
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default VisaStatus;