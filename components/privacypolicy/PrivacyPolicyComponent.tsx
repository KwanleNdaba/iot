import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicyComponent: FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Smart Sensor Flow - Your privacy matters to us
          </p>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700 text-sm">
              Your privacy and transparency about how we collect, use, and share
              information about you are important to us. This policy is intended
              to help you understand how we handle your personal information.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              What information do we collect
            </h2>

            <div className="space-y-3">
              <ul className="text-sm space-y-2 list-disc ml-6">
                <li>Name, email address, phone number, physical address</li>
                <li>
                  Name of the company, job title, and other professional
                  details, such as job role, industry, etc.
                </li>
                <li>
                  Billing details for clients engaged in a business relationship
                </li>
                <li>
                  Opinions and other information submitted via our websites,
                  surveys or other channels (for ex: LinkedIn, Twitter, FB &
                  others)
                </li>
                <li>
                  We also may collect additional information that is related to
                  you such as your computer's operating system, browser, and
                  your use of and activities on our websites
                </li>
                <li>
                  When registering, subscribing or ordering IoT Devices on our
                  site, as appropriate, you may be asked to enter your name,
                  e-mail address, mailing address, delivery address, phone
                  number or credit card information. You may, however, visit our
                  site anonymously (
                  <a
                    href="https://admin.smartsensorflow.io"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    admin.smartsensorflow.io
                  </a>
                  )
                </li>
              </ul>

              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  The content you provide through our products:
                </h3>
                <p className="text-sm">
                  The Services include the Smart Sensor Flow Demo, Smart Sensor
                  Flow POC, Smart Sensor Flow Small Business and Smart Sensor
                  Flow Enterprise platforms you use, where we collect and store
                  content that you add to the service. This content includes any
                  information about you that you may choose to include.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  Information you provide through our support channels:
                </h3>
                <p className="text-sm">
                  The Services also include customer support, where you may
                  choose to submit information regarding a problem you are
                  experiencing with a Service. Whether you designate yourself as
                  a technical contact, open a support ticket, speak to one of
                  our representatives directly or otherwise engage with our
                  support team, you will be asked to provide contact
                  information, a summary of the problem you are experiencing,
                  and any other documentation, screenshots or information that
                  would be helpful in resolving the issue.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              How we use the information we collect
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                How we use the information we collect depends in part on which
                Services you use, how you use them, and any preferences you have
                communicated to us. Below are the specific purposes for which we
                use the information we collect about you:
              </p>

              <ul className="text-sm space-y-3 list-disc ml-6">
                <li>
                  <strong>To personalize your experience</strong> - your
                  information helps us to better respond to your individual
                  needs
                </li>
                <li>
                  <strong>To improve our website</strong> - we continually
                  strive to improve our website offerings based on the
                  information and feedback we receive from you
                </li>
                <li>
                  <strong>To improve customer service</strong> - your
                  information helps us to more effectively respond to your
                  customer service requests and support needs
                </li>
                <li>
                  <strong>To process transactions</strong> - Your information,
                  whether public or private, will not be sold, exchanged,
                  transferred, or given to any other company for any reason
                  whatsoever, without your consent, other than for the express
                  purpose of delivering the purchased product or service
                  requested.
                </li>
                <li>
                  <strong>To send periodic emails</strong> - The email address
                  you provide for registration, subscription or order, may be
                  used to send you information and updates pertaining to your
                  order, in addition to receiving occasional company news,
                  updates, related product or service information, etc.
                </li>
                <li>
                  <strong>
                    To comply with applicable laws, safety, and property, and
                    respond to lawful requests from public authorities
                  </strong>
                </li>
                <li>
                  <strong>
                    If you post content on our social media channels
                  </strong>
                  , your participation may be shared on our website or our
                  channels
                </li>
              </ul>

              <div className="mt-4 p-3 bg-gray-50 rounded border">
                <p className="text-sm">
                  We generally retain information for so long as it is relevant
                  to serve you. Data may persist in copies made for backup
                  purposes. Smart Sensor Flow will respect your wishes not to
                  receive marketing communications. You can change your
                  marketing preferences at any time by contacting us at{" "}
                  <a
                    href="mailto:info@smartsensorflow.io"
                    className="text-blue-600 hover:underline"
                  >
                    info@smartsensorflow.io
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              How to delete your information?
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                If you subscribe to our newsletter, you can opt-out at any time
                by using the unsubscribe links at the bottom of our emails. Our
                Services give you the ability to delete all personal information
                from within the Service. You can completely delete your account
                and data by clicking the 'Delete Account' button which is
                available on the User Profile Page. Please note, however, that
                we may need to retain certain information for record-keeping
                purposes, to complete transactions or to comply with our legal
                obligations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              How we store and secure the information we collect
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                We implement a variety of security measures to maintain the
                safety of your personal information when you place an order or
                enter, submit, or access your personal information.
              </p>

              <p className="text-sm">
                We offer the use of a secure server. All supplied
                sensitive/credit information is transmitted via Secure Socket
                Layer (SSL) technology and then encrypted into our Payment
                gateway providers database only to be accessible by those
                authorized with special access rights to such systems, and are
                required to keep the information confidential.
              </p>

              <p className="text-sm">
                After a transaction, your private information (credit cards, ID
                - social security numbers, financials, etc.) will not be stored
                on our servers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">How we use cookies?</h2>

            <div className="space-y-3">
              <p className="text-sm">
                Smart Sensor Flow Web site, software platform and our
                third-party partners, such as our advertising and analytics
                partners, use cookies and other tracking technologies (e.g., web
                beacons, device identifiers and pixels) to provide functionality
                and to recognize you across different Services and devices. To
                opt-out of our use of cookies, you can instruct your browser, by
                changing its options, to stop accepting cookies or to prompt you
                before accepting a cookie from websites you visit.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Do we disclose any information to outside parties?
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                We do not sell, trade, or otherwise transfer to outside parties
                your personally identifiable information. This does not include
                trusted third parties who assist us in operating our website,
                conducting our business, or servicing you, so long as those
                parties agree to keep this information confidential. We may also
                release your information when we believe release is appropriate
                to comply with the law, enforce our site policies, or protect
                ours or others rights, property, or safety. However,
                non-personally identifiable visitor information may be provided
                to other parties for marketing, advertising, or other uses.
              </p>
            </div>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-muted-foreground">
              © Copyright 2025 Smart Sensor Flow
            </p>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Last updated: January 2025
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyComponent;
