import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, AlertTriangle, RefreshCw, Shield, Briefcase, Umbrella } from "react-feather";

const BookingPolicy = () => {
  const sections = [
    {
      id: "general-booking",
      icon: Calendar,
      title: "General Booking Terms",
      content: `By making a booking through FlyDriveGo, you agree to be bound by these Booking Terms and Conditions. Please read them carefully before completing your reservation.

All bookings are subject to availability and the service provider's terms and conditions. FlyDriveGo acts as an intermediary between you and the service providers (airlines, hotels, car rental companies, tour operators, etc.).

Bookings are only confirmed upon receipt of full payment or the required deposit, as applicable, and issuance of a confirmation email with a booking reference number.`
    },
    {
      id: "payment-terms",
      icon: DollarSign,
      title: "Payment Terms",
      content: `Full payment is required at the time of booking for most services. For certain tour packages and premium services, a deposit may be accepted with the balance due according to the specific terms provided at the time of booking.

We accept various payment methods including major credit/debit cards (Visa, MasterCard, American Express), PayPal, and in some regions, mobile payment options.

All prices are quoted in the currency indicated on the website and include applicable taxes unless otherwise stated. Additional fees such as local taxes, resort fees, or service charges may be collected by the service provider at the destination.

For installment payments, failure to make payments by the due dates may result in cancellation of the booking without refund.`
    },
    {
      id: "cancellation-policy",
      icon: RefreshCw,
      title: "Cancellation & Refund Policy",
      content: `Cancellation policies vary depending on the service and provider. Specific cancellation terms will be provided during the booking process and in your confirmation documents.

General cancellation tiers:
- More than 30 days before departure: Full refund minus administrative fee
- 15-30 days before departure: 50% refund
- 7-14 days before departure: 25% refund
- Less than 7 days before departure: No refund

Some bookings may be marked as non-refundable. No refunds will be provided for these bookings under any circumstances.

For flight bookings, specific airline cancellation policies will apply, which may differ from the above.

Refunds will be processed within 7-14 business days and will be issued to the original payment method.`
    },
    {
      id: "changes-modifications",
      icon: Clock,
      title: "Changes & Modifications",
      content: `Changes to bookings (dates, times, passenger names, etc.) may be subject to availability and additional fees.

Modification requests must be submitted:
- For flights: At least 48 hours before scheduled departure
- For hotels: At least 24 hours before check-in
- For car rentals: At least 24 hours before pickup
- For tour packages: According to the specific terms provided at booking

Some bookings may be marked as non-modifiable. These bookings cannot be changed once confirmed.

FlyDriveGo reserves the right to charge a service fee for processing any changes in addition to any fees charged by the service provider.`
    },
    {
      id: "no-show-policy",
      icon: AlertTriangle,
      title: "No-Show Policy",
      content: `Failure to check in for a flight, arrive at a hotel by the end of the day on the scheduled date of arrival, or collect a rental car within 2 hours of the scheduled pickup time constitutes a "no-show."

No-shows generally result in the cancellation of the entire booking with no refund or credit.

For multi-segment flight bookings, a no-show for one segment may result in the automatic cancellation of subsequent segments without refund.`
    },
    {
      id: "insurance",
      icon: Umbrella,
      title: "Travel Insurance",
      content: `We strongly recommend purchasing travel insurance to protect against unexpected events, medical emergencies, trip cancellations, and lost or damaged luggage.

Travel insurance is offered during the booking process at an additional cost. Coverage details will be provided before purchase.

Claims must be made directly with the insurance provider according to their procedures and timelines.

Pre-existing conditions may not be covered unless specified otherwise in the insurance policy.`
    },
    {
      id: "special-requests",
      icon: Briefcase,
      title: "Special Requests & Requirements",
      content: `Special requests (such as dietary requirements, accessibility needs, adjacent seats, etc.) will be forwarded to the service provider but cannot be guaranteed unless specifically confirmed.

Special requests should be made at the time of booking. Late requests may not be accommodated.

For travelers with reduced mobility or special needs, please contact our customer service team before booking to ensure appropriate arrangements can be made.`
    },
    {
      id: "liability",
      icon: Shield,
      title: "Liability & Responsibilities",
      content: `FlyDriveGo acts as an intermediary and is not liable for any acts, omissions, or negligence by service providers, or for any loss, damage, injury, delay, or inconvenience experienced by travelers.

Travelers are responsible for ensuring they have valid travel documents, visas, and meet health requirements for their destination. FlyDriveGo is not liable for denied entry or boarding due to inadequate documentation.

Force Majeure: FlyDriveGo is not liable for any failure to perform its obligations due to unforeseen circumstances beyond its control, including but not limited to acts of God, war, terrorism, civil unrest, natural disasters, strikes, or government actions. In such cases, our standard cancellation policies will apply unless otherwise mandated by law.`
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Jump to section functionality
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-SmokeWhite">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-red-rose font-bold text-CharcoleDark mb-6">Booking Policy</h1>
          <p className="text-lg font-poppins text-CharcoleDark/70 max-w-3xl mx-auto">
            Please review our booking terms and conditions. By making a reservation with FlyDriveGo,
            you agree to be bound by these policies.
          </p>
          <div className="mt-10">
            <p className="text-sm font-poppins text-CharcoleDark/50">Last Updated: June 1, 2024</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold mb-4 text-CharcoleDark">Contents</h2>
              <ul className="space-y-2 font-poppins">
                {sections.map(section => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className="text-primary hover:text-primary/70 transition-colors flex items-center gap-2 w-full text-left"
                    >
                      <section.icon size={16} />
                      <span>{section.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sections.map(section => (
              <motion.div
                key={section.id}
                id={section.id}
                className="mb-12 bg-white p-6 md:p-8 rounded-xl shadow-sm"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <section.icon className="text-primary w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-red-rose font-bold text-CharcoleDark">{section.title}</h2>
                </div>
                <div className="font-poppins text-CharcoleDark/80 leading-relaxed space-y-4">
                  {section.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Contact for Questions */}
            <motion.div
              className="bg-primary/5 p-6 md:p-8 rounded-xl"
              variants={itemVariants}
            >
              <h3 className="text-xl font-red-rose font-bold text-CharcoleDark mb-4">
                Questions About Our Policies?
              </h3>
              <p className="font-poppins text-CharcoleDark/80 mb-6">
                If you have any questions about our booking policies or need clarification on any terms,
                please don't hesitate to contact our customer service team for assistance.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:support@flydrivego.com" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email Support
                </a>
                <a href="tel:+8801234567890" className="bg-white border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/5 transition-colors font-medium inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Us
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Back to top button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BookingPolicy;
