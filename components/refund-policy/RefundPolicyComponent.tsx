import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from  "@/components/ui/card";

const RefundPolicyComponent: FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Refund Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 text-sm">
              This Refund Policy outlines the terms and conditions under which
              Smart Sensor Flow ("we," "us," or "our") provides refunds for
              subscriptions to the Smart Sensor Flow multi-tenant application.
              By subscribing to our services, you ("User," "you," or "your")
              agree to this policy.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              1. Purpose of This Policy
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                This policy is designed to clearly define the circumstances
                under which refunds for our platform subscription services may
                be granted, ensuring fairness for our Users while protecting the
                operational integrity and financial sustainability of the
                platform.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              2. Scope of Application
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                This policy applies solely to the monthly or annual subscription
                fees paid for access and usage of the Smart Sensor Flow
                multi-tenant application. It explicitly does not cover any
                separate services, add-ons, or third-party offerings that may be
                associated with your use of the platform, such as technical
                support packages.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              3. Refund Eligibility
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                We offer a limited refund period under specific conditions:
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium mb-2 text-blue-800">
                  Initial Subscription (New Users Only):
                </h3>
                <p className="text-sm text-blue-700 mb-2">
                  A full refund may be requested within seven (7) calendar days
                  of the initial activation date of a new paid subscription,
                  provided that:
                </p>
                <ul className="text-sm text-blue-700 space-y-2 list-disc ml-6">
                  <li>
                    The user has not significantly utilized the platform (e.g.,
                    created more than one (1) organization, processed more than
                    a minimal number of transactions/data entries, or exceeded a
                    pre-defined usage threshold, if applicable and specified in
                    your Terms of Service).
                  </li>
                  <li>
                    The request is based on an inability to use the core
                    functionality of the platform due to a verified technical
                    issue attributable to Smart Sensor Flow that we are unable
                    to resolve within a reasonable timeframe.
                  </li>
                  <li>The User has complied with our Terms of Service.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              4. Non-Refundable Circumstances
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                Unless explicitly stated in Section 3, the following
                circumstances generally do not qualify for a refund:
              </p>

              <ul className="text-sm space-y-3 list-disc ml-6">
                <li>
                  <strong>After the Initial Refund Period:</strong> No refunds
                  will be provided for any subscription period beyond the
                  initial seven (7) calendar days.
                </li>
                <li>
                  <strong>Partial Usage:</strong> No refunds will be granted for
                  any partial use of a subscription period (e.g., cancelling
                  mid-month or mid-year). Once a billing cycle begins, the fee
                  for that cycle is considered earned.
                </li>
                <li>
                  <strong>Subscription Renewals:</strong> All subscription
                  renewals (monthly or annual) are non-refundable. It is the
                  User's responsibility to cancel their subscription prior to
                  the renewal date to avoid being charged for the next billing
                  cycle.
                </li>
                <li>
                  <strong>Change of Mind:</strong> Refunds are not issued for a
                  change of mind, discontinuation of business, or if the
                  platform does not meet expectations not explicitly guaranteed
                  in our service descriptions or Terms of Service.
                </li>
                <li>
                  <strong>Breach of Terms of Service:</strong> Users who have
                  violated our Terms of Service, including but not limited to,
                  misuse of the platform, fraudulent activity, or non-compliance
                  with any platform policies, are not eligible for refunds.
                </li>
                <li>
                  <strong>Feature Discontinuation:</strong> While we strive to
                  maintain consistent service, specific features or
                  functionalities may be updated, modified, or discontinued
                  without prior notice. Such changes do not entitle a user to a
                  refund.
                </li>
                <li>
                  <strong>Third-Party Issues:</strong> Issues arising from
                  third-party services, internet connectivity problems on the
                  User's end, or hardware/software incompatibilities not
                  directly related to Smart Sensor Flow's core functionality are
                  not eligible for refunds.
                </li>
                <li>
                  <strong>Account Deletion:</strong> Deleting an account or
                  organization does not automatically trigger a refund for any
                  active subscription periods.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              5. How to Request a Refund
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                All refund requests must be submitted in writing via email to{" "}
                <a
                  href="mailto:info@smartsensorflow.io"
                  className="text-blue-600 hover:underline"
                >
                  info@smartsensorflow.io
                </a>{" "}
                within the eligible refund period. Your request must include:
              </p>

              <ul className="text-sm space-y-2 list-disc ml-6">
                <li>
                  Your full name and the email address associated with your
                  Smart Sensor Flow account.
                </li>
                <li>Your Organization Name within the platform.</li>
                <li>The date of the original subscription purchase.</li>
                <li>
                  A clear and detailed explanation of the reason for your refund
                  request.
                </li>
                <li>
                  Any relevant documentation or screenshots supporting your
                  claim.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Refund Process</h2>

            <div className="space-y-3">
              <p className="text-sm">
                Upon receipt of a valid refund request, we will:
              </p>

              <ul className="text-sm space-y-2 list-disc ml-6">
                <li>Acknowledge your request within 2-3 business days.</li>
                <li>
                  Review the request against the eligibility criteria outlined
                  in this policy.
                </li>
                <li>
                  If approved, the refund will be processed to the original
                  payment method used for the subscription within 5-10 business
                  days. Please note that it may take additional time for the
                  refund to appear on your bank or credit card statement,
                  depending on your financial institution.
                </li>
                <li>
                  We reserve the right to deny any refund request that does not
                  meet the criteria outlined in this policy. Our decision on all
                  refund requests will be final.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              7. Subscription Cancellation
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                Cancelling your subscription will prevent future billing, but it
                does not automatically entitle you to a refund for the current
                or any past subscription period. You will retain access to the
                platform for the remainder of your paid subscription term.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              8. Changes to This Refund Policy
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                Smart Sensor Flow reserves the right to modify or update this
                Refund Policy at any time without prior notice. Any changes will
                be effective immediately upon posting the revised policy on our
                website. It is your responsibility to review this policy
                periodically for any updates. Continued use of the Smart Sensor
                Flow platform after any such changes constitutes your acceptance
                of the new Refund Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>

            <div className="space-y-3">
              <p className="text-sm">
                If you have any questions about this Refund Policy, please
                contact us at:
              </p>

              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-sm font-medium">
                  Email:{" "}
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

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-muted-foreground">
              © Copyright 2025 Smart Sensor Flow
            </p>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Last updated: July 9, 2025
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefundPolicyComponent;
