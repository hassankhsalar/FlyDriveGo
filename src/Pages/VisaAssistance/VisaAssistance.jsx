import { useState, useEffect, useMemo, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  MapPin,
  Calendar,
  FileText,
  Upload,
  CheckSquare,
  HelpCircle,
  Clock,
  AlertTriangle,
  X,
  LogIn
} from 'lucide-react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Chip,
  Divider,
  Alert,
  Box
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const VisaAssistance = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [activeStep, setActiveStep] = useState(0);
  const [countries, setCountries] = useState([]);
  const [visaTypes, setVisaTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [applicationRef, setApplicationRef] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [documentUrls, setDocumentUrls] = useState([]);
  const fileInputRef = useRef(null);

  // Check for authentication and redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login to access visa application services");
      navigate('/login', { state: { from: '/visa-assistance', message: 'Login required for visa services' } });
    }
  }, [user, navigate]);

  // If user is not logged in, render login prompt instead of the form
  if (!user) {
    return (
      <div className="min-h-screen bg-SmokeWhite p-8 flex items-center justify-center">
        <Paper className="p-8 max-w-md w-full text-center">
          <LogIn size={48} className="mx-auto text-primary mb-4" />
          <Typography variant="h5" className="font-bold mb-3 font-red-rose">
            Login Required
          </Typography>
          <Typography variant="body1" className="mb-6 font-poppins">
            Please login to access visa application services. Our visa assistance is exclusively available for registered users.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/login', { state: { from: '/visa-assistance' } })}
            className="font-poppins"
          >
            Go to Login
          </Button>
        </Paper>
      </div>
    );
  }

  const { control, register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: user?.displayName || '',
      email: user?.email || '',
      nationality: '',
      passportNumber: '',
      destinationCountry: '',
      visaType: '',
      travelDate: '',
      returnDate: '',
      purpose: '',
      additionalRequirements: ''
    }
  });

  const steps = ['Personal Details', 'Travel Information', 'Documentation', 'Review & Submit'];

  // Common countries people travel to from your region
  const countriesList = useMemo(() => [
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'TH', name: 'Thailand' },
    { code: 'IN', name: 'India' },
    { code: 'CN', name: 'China' },
    { code: 'JP', name: 'Japan' },
    { code: 'TR', name: 'Turkey' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' }
  ], []);

  // Common visa types
  const visaTypesList = useMemo(() => [
    { id: 'tourist', name: 'Tourist Visa', countries: ['US', 'UK', 'CA', 'AU', 'AE', 'SA', 'MY', 'SG', 'TH', 'IN', 'CN', 'JP', 'TR', 'FR', 'DE', 'IT', 'ES'] },
    { id: 'business', name: 'Business Visa', countries: ['US', 'UK', 'CA', 'AU', 'AE', 'SA', 'MY', 'SG', 'TH', 'IN', 'CN', 'JP', 'TR', 'FR', 'DE', 'IT', 'ES'] },
    { id: 'student', name: 'Student Visa', countries: ['US', 'UK', 'CA', 'AU', 'MY', 'SG', 'JP', 'FR', 'DE', 'IT'] },
    { id: 'work', name: 'Work Visa', countries: ['US', 'UK', 'CA', 'AU', 'AE', 'SA', 'SG', 'JP', 'DE'] },
    { id: 'transit', name: 'Transit Visa', countries: ['US', 'UK', 'AE', 'SA'] },
    { id: 'medical', name: 'Medical Visa', countries: ['IN', 'SG', 'TH', 'MY'] },
    { id: 'umrah', name: 'Umrah Visa', countries: ['SA'] },
    { id: 'hajj', name: 'Hajj Visa', countries: ['SA'] }
  ], []);

  useEffect(() => {
    // Instead of making API calls, we'll use the memoized data
    // This can be replaced with API calls when your backend is ready
    setCountries(countriesList);
    setVisaTypes(visaTypesList);

    // Prefill user data if available
    if (user) {
      reset({
        fullName: user.displayName || '',
        email: user.email || '',
        nationality: '',
        passportNumber: '',
        destinationCountry: '',
        visaType: '',
        travelDate: '',
        returnDate: '',
        purpose: '',
        additionalRequirements: ''
      });
    }
  }, [user, countriesList, visaTypesList, reset]);

  const watchDestinationCountry = watch('destinationCountry');
  const watchVisaType = watch('visaType');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
    setSubmitSuccess(false);
    setSubmitError(null);
    setUploadedFiles([]);
    setDocumentUrls([]); // Clear document URLs as well
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = (e) => {
    const filesList = e.target.files;
    if (filesList && filesList.length > 0) {
      const filesArray = Array.from(filesList);
      console.log("Files selected:", filesArray.map(f => ({
        name: f.name,
        type: f.type,
        size: `${(f.size / 1024).toFixed(2)}KB`
      })));
      setUploadedFiles(filesArray);
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    // Reset the file input if all files are removed
    if (uploadedFiles.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadToCloudinary = async (file) => {
    // Validate file size before uploading
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return {
        success: false,
        message: `File ${file.name} exceeds 5MB size limit`
      };
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'visa_documents');
    // Add timestamp to help with caching issues
    formData.append('timestamp', Math.round(new Date().getTime() / 1000));

    try {
      console.log(`Uploading file: ${file.name} (${file.type})`);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );

      console.log("Cloudinary upload success:", response.data);
      return {
        success: true,
        url: response.data.secure_url,
        public_id: response.data.public_id,
        original_filename: file.name
      };
    } catch (error) {
      console.error("Error uploading to Cloudinary:", {
        message: error.message,
        response: error.response?.data,
        file: file.name
      });

      // Return a more user-friendly error message
      return {
        success: false,
        message: error.response?.data?.error?.message ||
          "Failed to upload file. Please try again."
      };
    }
  };

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Please login to submit a visa application");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Upload documents to Cloudinary if any
      let docUrls = [];
      if (uploadedFiles.length > 0) {
        toast.loading("Uploading documents...");

        // Upload each file individually
        const uploadPromises = uploadedFiles.map(file => uploadToCloudinary(file));
        const uploadResults = await Promise.all(uploadPromises);

        docUrls = uploadResults
          .filter(result => result.success)
          .map(result => ({
            name: result.original_filename,
            url: result.url,
            public_id: result.public_id
          }));

        // Update the state with document URLs
        setDocumentUrls(docUrls);

        if (uploadResults.some(result => !result.success)) {
          toast.error("Some files failed to upload");
        }

        toast.dismiss();
      }

      // Generate a reference number
      const refNumber = `VA-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationRef(refNumber);

      // Format the data for submission
      const visaApplication = {
        ...data,
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        submissionDate: new Date().toISOString(),
        status: 'pending',
        documents: docUrls, // Use the local variable to ensure we have the latest data
        countryName: countries.find(c => c.code === data.destinationCountry)?.name,
        visaTypeName: visaTypes.find(t => t.id === data.visaType)?.name,
        referenceNumber: refNumber
      };

      console.log("Sending visa application:", visaApplication);

      // Submit to your API
      const response = await axiosPublic.post('/visa-applications', visaApplication);
      console.log('Visa application submitted successfully:', response.data);

      setSubmitSuccess(true);
      setActiveStep(steps.length);
      toast.success("Visa application submitted successfully!");
    } catch (error) {
      console.error('Error submitting visa application:', error);
      setSubmitError(error.response?.data?.message || 'Failed to submit application. Please try again.');
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("Document URLs:", documentUrls);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <FormField
              label="Full Name (as in passport)"
              icon={<CreditCard className="w-5 h-5 text-primary" />}
              error={errors.fullName}
            >
              <TextField
                fullWidth
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" }
                })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            </FormField>

            <FormField
              label="Email Address"
              icon={<HelpCircle className="w-5 h-5 text-primary" />}
              error={errors.email}
            >
              <TextField
                fullWidth
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </FormField>

            <FormField
              label="Nationality"
              icon={<MapPin className="w-5 h-5 text-primary" />}
              error={errors.nationality}
            >
              <FormControl fullWidth error={!!errors.nationality}>
                <InputLabel>Nationality</InputLabel>
                <Controller
                  name="nationality"
                  control={control}
                  rules={{ required: "Nationality is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Nationality"
                    >
                      {countries.map(country => (
                        <MenuItem key={country.code} value={country.code}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.nationality?.message}</FormHelperText>
              </FormControl>
            </FormField>

            <FormField
              label="Passport Number"
              icon={<CreditCard className="w-5 h-5 text-primary" />}
              error={errors.passportNumber}
            >
              <TextField
                fullWidth
                {...register("passportNumber", {
                  required: "Passport number is required",
                  pattern: {
                    value: /^[A-Z0-9]{6,9}$/i,
                    message: "Please enter a valid passport number (6-9 alphanumeric characters)"
                  }
                })}
                error={!!errors.passportNumber}
                helperText={errors.passportNumber?.message}
              />
            </FormField>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <FormField
              label="Destination Country"
              icon={<MapPin className="w-5 h-5 text-primary" />}
              error={errors.destinationCountry}
            >
              <FormControl fullWidth error={!!errors.destinationCountry}>
                <InputLabel>Destination Country</InputLabel>
                <Controller
                  name="destinationCountry"
                  control={control}
                  rules={{ required: "Destination country is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Destination Country"
                    >
                      {countries.map(country => (
                        <MenuItem key={country.code} value={country.code}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.destinationCountry?.message}</FormHelperText>
              </FormControl>
            </FormField>

            <FormField
              label="Visa Type"
              icon={<CreditCard className="w-5 h-5 text-primary" />}
              error={errors.visaType}
            >
              <FormControl fullWidth error={!!errors.visaType}>
                <InputLabel>Visa Type</InputLabel>
                <Controller
                  name="visaType"
                  control={control}
                  rules={{ required: "Visa type is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Visa Type"
                      disabled={!watchDestinationCountry}
                    >
                      {visaTypes
                        .filter(type => !watchDestinationCountry || type.countries.includes(watchDestinationCountry))
                        .map(type => (
                          <MenuItem key={type.id} value={type.id}>
                            {type.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
                <FormHelperText>{!watchDestinationCountry ? "Please select a destination country first" : errors.visaType?.message}</FormHelperText>
              </FormControl>
            </FormField>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Planned Travel Date"
                icon={<Calendar className="w-5 h-5 text-primary" />}
                error={errors.travelDate}
              >
                <TextField
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register("travelDate", {
                    required: "Travel date is required",
                    validate: value => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const selectedDate = new Date(value);
                      return selectedDate >= today || "Travel date must be in the future";
                    }
                  })}
                  error={!!errors.travelDate}
                  helperText={errors.travelDate?.message}
                />
              </FormField>

              <FormField
                label="Planned Return Date"
                icon={<Calendar className="w-5 h-5 text-primary" />}
                error={errors.returnDate}
              >
                <TextField
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register("returnDate", {
                    required: "Return date is required",
                    validate: value => {
                      const travelDate = watch('travelDate');
                      if (!travelDate) return true;
                      return new Date(value) > new Date(travelDate) || "Return date must be after travel date";
                    }
                  })}
                  error={!!errors.returnDate}
                  helperText={errors.returnDate?.message}
                />
              </FormField>
            </div>

            <FormField
              label="Purpose of Travel"
              icon={<FileText className="w-5 h-5 text-primary" />}
              error={errors.purpose}
            >
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Please provide details about your trip"
                {...register("purpose", {
                  required: "Purpose of travel is required",
                  minLength: { value: 20, message: "Please provide more details (minimum 20 characters)" }
                })}
                error={!!errors.purpose}
                helperText={errors.purpose?.message}
              />
            </FormField>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Alert severity="info" className="mb-4">
              Based on your destination ({countries.find(c => c.code === watchDestinationCountry)?.name || 'selected country'}) and visa type ({visaTypes.find(t => t.id === watchVisaType)?.name || 'selected visa type'}),
              please upload the following documents:
            </Alert>

            <Paper className="p-4 bg-gray-50">
              <Typography variant="subtitle1" className="font-semibold mb-2">
                Required Documents:
              </Typography>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Valid passport (first and last page)</li>
                <li>Passport-sized photograph (35mm x 45mm, white background)</li>
                <li>Flight itinerary</li>
                <li>Hotel reservation</li>
                {watchVisaType === 'business' && (
                  <>
                    <li>Invitation letter</li>
                    <li>Company registration documents</li>
                  </>
                )}
                {watchVisaType === 'student' && (
                  <>
                    <li>Admission letter from institution</li>
                    <li>Proof of financial means</li>
                  </>
                )}
                {watchVisaType === 'medical' && (
                  <>
                    <li>Medical appointment letter</li>
                    <li>Medical history report</li>
                  </>
                )}
                {(watchVisaType === 'umrah' || watchVisaType === 'hajj') && (
                  <>
                    <li>Pilgrimage authorization</li>
                    <li>Vaccination certificates</li>
                  </>
                )}
              </ul>

              <FormField
                label="Upload Documents"
                icon={<Upload className="w-5 h-5 text-primary" />}
              >
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <FormHelperText>
                  Please upload all required documents in PDF, JPG, or PNG format.
                  Max size: 5MB per file.
                </FormHelperText>
              </FormField>

              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <Typography variant="subtitle2" className="font-semibold mb-2">
                    Selected Files ({uploadedFiles.length}):
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((file, index) => (
                      <Chip
                        key={index}
                        label={`${file.name} (${(file.size / 1024).toFixed(1)}KB)`}
                        variant="outlined"
                        color="primary"
                        className="mb-2"
                        onDelete={() => handleRemoveFile(index)}
                        deleteIcon={<X size={16} />}
                      />
                    ))}
                  </div>
                </div>
              )}

              <FormField
                label="Additional Requirements or Notes"
                icon={<FileText className="w-5 h-5 text-primary" />}
                error={errors.additionalRequirements}
              >
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  {...register("additionalRequirements")}
                  placeholder="Any specific requirements or information you want to share with our visa processing team"
                />
              </FormField>
            </Paper>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Paper className="p-6 bg-gray-50">
              <Typography variant="h6" className="font-bold mb-4">
                Application Summary
              </Typography>

              <div className="space-y-4">
                <SummaryItem label="Full Name" value={watch('fullName')} />
                <SummaryItem label="Email" value={watch('email')} />
                <SummaryItem label="Nationality" value={countries.find(c => c.code === watch('nationality'))?.name || watch('nationality')} />
                <SummaryItem label="Passport Number" value={watch('passportNumber')} />
                <Divider className="my-3" />

                <SummaryItem
                  label="Destination"
                  value={countries.find(c => c.code === watch('destinationCountry'))?.name || watch('destinationCountry')}
                />
                <SummaryItem
                  label="Visa Type"
                  value={visaTypes.find(t => t.id === watch('visaType'))?.name || watch('visaType')}
                />
                <SummaryItem
                  label="Travel Date"
                  value={watch('travelDate') ? new Date(watch('travelDate')).toLocaleDateString() : ''}
                />
                <SummaryItem
                  label="Return Date"
                  value={watch('returnDate') ? new Date(watch('returnDate')).toLocaleDateString() : ''}
                />
                <Divider className="my-3" />

                <div>
                  <Typography variant="subtitle2" className="font-semibold mb-1">
                    Purpose of Travel:
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    {watch('purpose')}
                  </Typography>
                </div>

                {uploadedFiles.length > 0 && (
                  <div>
                    <Typography variant="subtitle2" className="font-semibold mb-1">
                      Uploaded Documents ({uploadedFiles.length}):
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          variant="outlined"
                          color="primary"
                          size="small"
                          className="mb-1"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {watch('additionalRequirements') && (
                  <div>
                    <Typography variant="subtitle2" className="font-semibold mb-1">
                      Additional Requirements:
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      {watch('additionalRequirements')}
                    </Typography>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Alert severity="warning">
                  Please review your application carefully before submitting. Once submitted, you'll be able to track
                  the status of your visa application through your account dashboard.
                </Alert>
              </div>
            </Paper>
          </div>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <div
      className="min-h-screen bg-SmokeWhite p-8 opacity-0 animate-fadeIn"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-red-rose font-bold text-CharcoleDark mb-2">
          Visa Assistance
        </h1>
        <p className="text-gray-600 mb-8 font-poppins">
          Complete the form below and our visa specialists will process your application
        </p>

        <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <div
            className="text-center py-10 opacity-0 translate-y-5 animate-slideUp"
          >
            {submitSuccess ? (
              <>
                <CheckSquare className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <Typography variant="h4" className="mb-2 font-bold">
                  Application Submitted Successfully!
                </Typography>
                <Typography variant="body1" className="mb-6 text-gray-600">
                  Your visa application has been received. You can track its status in your dashboard.
                </Typography>
                <Typography variant="body2" className="mb-8 text-gray-500">
                  Application Reference: {applicationRef}
                </Typography>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button onClick={handleReset} variant="outlined" color="primary">
                    Submit Another Application
                  </Button>
                  <Button variant="contained" color="primary" href="/visa-status">
                    Track Your Application
                  </Button>
                </div>
              </>
            ) : (
              <>
                {submitError && (
                  <Alert severity="error" className="mb-4">
                    {submitError}
                  </Alert>
                )}
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <Typography variant="h5" className="mb-4">
                  Something went wrong with your submission.
                </Typography>
                <Button onClick={handleReset} variant="outlined" color="primary">
                  Try Again
                </Button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {getStepContent(activeStep)}

            <div className="mt-8 flex justify-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>

              <div>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <Clock className="animate-spin" /> : null}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      (activeStep === 0 && (!watch('fullName') || !watch('email') || !watch('nationality') || !watch('passportNumber'))) ||
                      (activeStep === 1 && (!watch('destinationCountry') || !watch('visaType') || !watch('travelDate') || !watch('returnDate')))
                    }
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const FormField = ({ label, icon, children, error }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 font-poppins text-CharcoleDark/80">
      {icon}
      {label}
    </label>
    {children}
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div className="flex flex-wrap justify-between gap-2">
    <Typography variant="subtitle2" className="font-semibold">
      {label}:
    </Typography>
    <Typography variant="body2" className="text-gray-700">
      {value || 'Not provided'}
    </Typography>
  </div>
);

export default VisaAssistance;