import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsAndConditionsComponent: FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Terms of Use
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Please read these terms and conditions carefully
          </p>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-700 text-sm">
              These Terms of Service, including its appendixes specific to the
              country ("SSFCP Service Agreement", "SSFCP Agreement",
              "Agreement") represent the terms and conditions applied to the
              access and use of the Smart Sensor Flow Cloud Platform, currently
              reachable at URL: https://admin.smartsensorflow.io or other
              configured custom domain that might be in use from time to time.
              This document is a legally binding agreement between the entity or
              person accepting these terms ("Customer" or "You") that govern the
              application to services provided by the Smart Sensor Flow entity
              listed in Paragraph 2 below (referred to as "We", "Our" or "Smart
              Sensor Flow Cloud Platform"). By using the Smart Sensor Flow Cloud
              Platform, the Customer acknowledges and agrees that they have
              read, understood, and consent to be bound by the Terms and all
              Your affiliate users or users approached by You ("End User") to
              use Service are bound to this Terms of Service.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              1. Submission and Acceptance of the Terms
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>1.1</strong> Customer use of the Smart Sensor Flow Cloud
                Platform is subject to the terms and conditions contained in
                this document as well as Smart Sensor Flow Cloud Platform
                Privacy Policy, Stripe Terms of Service and any other website or
                service policies or conditions as adopted and integrated with
                the Smart Sensor Flow Cloud Platform from time to time (jointly,
                the "Terms").
              </p>

              <p className="text-sm">
                <strong>1.2</strong> This SSFCP Agreement", "Agreement") is
                effective (the "Effective Date") when a Customer accesses the
                Smart Sensor Flow Cloud Platform for the first time. If you are
                accepting Terms or accessing the platform on behalf of Customer,
                you represent and warrant that (i) you have full legal authority
                to bind Customer to this SSFCP Agreement", "Agreement") ; (ii)
                you have read and understand this SSFCP Agreement", "Agreement")
                ; and (iii) you agree, on behalf of Customer, to this SSFCP
                Agreement", "Agreement") . Vice versa, the Customer is deemed
                liable, represents and warrants that all users accept and comply
                with these Terms. Please do not use the Service if you do not
                agree to and accept all of the Terms. You acknowledge and agree
                that Smart Sensor Flow may amend any Terms at any time by
                posting the relevant amended and restated Terms on the Smart
                Sensor Flow Cloud Platform. Unless otherwise explicitly
                announced by Smart Sensor Flow, any changes to the Terms become
                effective right after they are posted. By continuing to use the
                Services, you agree to be bound by the latest released Terms.
              </p>

              <p className="text-sm">
                <strong>1.3</strong> You may request to enter into other terms
                and conditions and agreements ("Additional agreement"), whether
                online or offline, with Smart Sensor Flow. If there is any
                conflict or inconsistency between the Terms and the said
                agreements, the Additional agreement shall not take precedence
                over the Terms unless in respect to the services governed by the
                conflicting Additional Agreement.
              </p>

              <p className="text-sm">
                <strong>1.4</strong> Assignment of the Terms to any person or
                entity is denied.
              </p>

              <p className="text-sm">
                <strong>1.5</strong> Smart Sensor Flow, LLC. may change the
                Terms from time to time where such change is required to comply
                with applicable law, applicable regulation, court order, or
                guidance issued by a governmental regulator or agency, where
                such change is expressly permitted by the data processing and
                security policies, or where such change (i) is commercially
                reasonable; (ii) does not result in a degradation of the overall
                security of the Service; (iii) does not expand the scope of or
                remove any restrictions on processing of Customer personal data,
                as described in the Privacy Policy; and (iv) does not otherwise
                have a material adverse impact on Customer's rights.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              2. Provision of Service
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>2.1</strong> The Smart Sensor Flow legal entity that you
                are contracting with is Smart Sensor Flow LLC. (referred as to
                "Smart Sensor Flow")
              </p>

              <p className="text-sm">
                <strong>2.2</strong> You must register as a customer on the
                Smart Sensor Flow Cloud Platform in order to access and use the
                Service.
              </p>

              <p className="text-sm">
                <strong>2.3</strong> Smart Sensor Flow has the right to
                restrict, suspend or terminate your access to or use of the
                Smart Sensor Flow Cloud Platform or any features within the
                Service due to breach of the Terms or the Additional agreement.
              </p>

              <p className="text-sm">
                <strong>2.4</strong> The features within the Service may vary
                for different regions and countries. Smart Sensor Flow gives no
                warranty or representation that the Service or feature or
                function thereof will be available in all countries and regions
                or for all users, especially for the Customers under
                then-current sanctions list (
                <a
                  href="https://sanctionslist.ofac.treas.gov/Home/SdnList"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://sanctionslist.ofac.treas.gov/Home/SdnList
                </a>
                ). Smart Sensor Flow, LLC. may in its sole discretion limit,
                deny or create different levels of access to and use of Service
                with respect to different users.
              </p>

              <p className="text-sm">
                <strong>2.5</strong> Smart Sensor Flow may discontinue or modify
                the SSFCP Service or certain functionality of the same. We will
                notify Customer at least 12 (twelve) months before discontinuing
                Service or associated feature unless replaced with the same
                functionality Service or component.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              3. Use of the Smart Sensor Flow Cloud Platform
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>3.1</strong> Your compliance with any and all applicable
                laws and regulations is a condition of your access to and use of
                the Service. You agree that you will not engage in fraudulent or
                deceptive practices and will not provide products and services
                to SDNs from the above mentioned sanctions list, terrorists,
                extremists and all other illegal or semi-legal entities, when
                using the Service.
              </p>

              <div>
                <p className="text-sm mb-2">
                  <strong>3.2</strong> With respect to content made available
                  via the Service, the Customer and its End users agree that
                  they will not:
                </p>
                <ul className="text-sm space-y-2 ml-4">
                  <li>
                    (a) copy, modify, or create a derivative work of the
                    Service;
                  </li>
                  <li>
                    (b) reverse engineer, decompile, translate, disassemble, or
                    otherwise attempt to extract any or all of the source code
                    of the Service (except to the extent such restriction is
                    expressly prohibited by applicable law);
                  </li>
                  <li>
                    (c) sell, resell, sublicense, transfer, or distribute any or
                    all of the Service;
                  </li>
                  <li>
                    (d) access or use the Service (i) for High Risk Activities,
                    provisioned such use comes into effect, the Customer bears
                    sole responsibility for any and all consequences; (ii)
                    violating the Terms; (iii) intending to avoid incurring Fees
                    or in a manner to omit Service-specific limits; (iv) to
                    engage in cryptocurrency mining; (v) contravening the
                    general purpose of the Service and its official
                    documentation; (vi) for materials or activities that are
                    subject to the International Traffic in Arms Regulations
                    (ITAR) maintained by the United States Department of State;
                    (vii) in a manner that breaches, or causes the breach of,
                    Export Control Laws; or (viii) to transmit, store, or
                    process personal information subject to GDPR and United
                    States HIPAA regulations except as permitted by law.
                  </li>
                  <li>
                    (e) without limiting the generality of the foregoing, copy,
                    reproduce, download, compile or otherwise use the Service
                    for the purposes of operating a business that competes with
                    Smart Sensor Flow Cloud;
                  </li>
                  <li>
                    (f) access or use the Service to produce, promote, provide
                    to end users materials (i) that are defamatory, obscene,
                    abusive, invasive of privacy, or offensive, including but
                    not limited to content related to child pornography,
                    bestiality, other types of illegal sexual content, and etc.;
                    (ii) obtained from or via the Service for any purpose not
                    expressly permitted in the Terms or the Additional
                    Agreement; or (iii) that infringe or misappropriate the
                    Intellectual Property Rights or proprietary rights of Smart
                    Sensor Flow, LLC. or others in connection with your use of
                    the Service.
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm mb-2">
                  <strong>3.3</strong> You agree that you will not:
                </p>
                <ul className="text-sm space-y-2 ml-4">
                  <li>
                    (a) undertake any action to gain unauthorized access to any
                    computer, network, database, or device of any Customer or
                    End User;
                  </li>
                  <li>
                    (b) intend to breach any security or authentication measures
                    used in connection thereto;
                  </li>
                  <li>
                    (c) forge your domicile and the origin of requests,
                    including the faking of TCP/IP packet headers, email
                    headers, or any part of any message describing its origin or
                    route, operate any network services, such as open proxies,
                    open mail relays, open recursive domain name servers, and
                    etc.;
                  </li>
                  <li>
                    (d) do any act which, in the sole opinion of Smart Sensor
                    Flow, LLC. or by protection mechanisms of Smart Sensor Flow
                    Cloud, may undermine the security of the Service and
                    Customers;
                  </li>
                  <li>
                    (e) engage in any denial of service (DoS) attacks,
                    distributed denial of service (DDoS) attacks, or any other
                    forms of network attacks potentially affecting the Service
                    performance or availability to particular Customers.
                  </li>
                </ul>
              </div>

              <p className="text-sm">
                <strong>3.5</strong> You agree that you will not distribute,
                send, or facilitate the sending or any unsolicited electronic
                commercial messages, or engage in any form of spamming
                activities that are in breach of the laws and regulations of any
                relevant jurisdiction or otherwise do any act or thing which
                constitutes promotion and marketing message abuse.
              </p>

              <p className="text-sm">
                <strong>3.6</strong> You acknowledge and agree that by
                disclosing any information to us, you warrant that you have the
                full power, title and authority to disclose and submit such
                information and that the use of such information in accordance
                with these Terms of Use shall not expose us to any claim,
                liability, or prosecution.
              </p>

              <p className="text-sm">
                <strong>3.7</strong> In addition to the Privacy Policy clauses
                in relation to personal data, you agree that any data and
                information, including personal data, provided to us for
                processing, storage, hosting or any other purposes in connection
                with your purchase and use of our Service ("Information") will
                be transferred to, stored and processed in the country in which
                we maintain facilities for the Service. This may be in a
                different jurisdiction from where you are located, so such
                Information may need to be transferred to an overseas
                jurisdiction.
              </p>

              <p className="text-sm">
                <strong>3.8</strong> You acknowledge and agree that any such
                overseas transfer or processing of such Information is necessary
                to process and administer your customer account and to provide
                the Service.
              </p>

              <p className="text-sm">
                <strong>3.9</strong> You acknowledge and agree that Information
                related to your payment cards, including Information about your
                payment method organisation, the your card number, last four
                digits of the card number, the security code, and the expiration
                date of your payment instrument will be transferred to, stored
                and processed by our third-party payment service provider
                (Stripe – PayPal - Yoco) directly in order for them to process
                your payment transactions and we will generally not store, have
                access to any such Information.
              </p>

              <p className="text-sm">
                <strong>3.10</strong> With respect to any other Information that
                you provide to us or collected by us, including Information
                provided at registration, Information we record pertaining to
                your activities, and Information provided voluntarily by you, we
                will not disclose such Information outside of us, our affiliates
                or our third-party service providers unless: i) you request us
                to do so; ii) your end-user has provided consent for us to do
                so; iii) as provided in these Terms of Use or in accordance with
                your agreement(s) with us, or iv) to comply with applicable law,
                legal process or lawful government requests, or in respect of
                any claims or potential claims brought against us.
              </p>

              <p className="text-sm">
                <strong>3.11</strong> "Smart Sensor Flow" and AIoT Global Net is
                a registered trademark in multiple regions. Customer is
                permitted to state publicly that it is a customer of the
                Service, consistent with the trademark guidelines. Smart Sensor
                Flow, LLC. may include Customer's name in a list of Smart Sensor
                Flow customers, online or in promotional materials. Smart Sensor
                Flow, LLC. may also verbally reference you as a customer of the
                Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              4. Withdrawal and suspension of the Service
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>4.1</strong> Smart Sensor Flow, LLC. shall have the
                right at its sole and absolute discretion to remove, modify or
                reject any content that you submit to, post or display on the
                Smart Sensor Flow Cloud Platform which in our sole opinion is
                unlawful, violates the Terms, or could subject Smart Sensor
                Flow, LLC. to liability without any refund claims.
              </p>

              <p className="text-sm">
                <strong>4.2</strong> If we become aware that Customer's or any
                Customer End User's use of the Service violates the Terms, we
                will give you notice of the violation requesting to cure the
                violation. If Customer fails to correct the violation within 24
                hours of our request, then we may suspend all or part of
                Customer's use of the Service until the violation is corrected,
                or delete the customer account completely.
              </p>

              <p className="text-sm">
                <strong>4.3</strong> Notwithstanding c 4.1, Smart Sensor Flow
                may immediately suspend all or part of Customer's use of the
                Service if (i) we consider the breach of Paragraph 3 clauses;
                (ii) there is suspected unauthorized third-party access to the
                Service; (iii) it is necessary to withdraw immediately to comply
                with applicable law. At Customer's request, we will notify the
                Customer of the basis for the suspension as soon as reasonably
                possible. The lift of any such suspension is possible if the
                suspending event will have resolved within 15 (fifteen) days
                after the suspension.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              5. Limitation of Liability
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>5.1</strong> To the maximum extent permitted under
                applicable law, the Service is provided "as is", "as available"
                and "with all faults", and Smart Sensor Flow, LLC. hereby
                expressly disclaims any and all warranties, express or implied,
                including but not limited to, any warranties of condition,
                quality, durability, performance, availability, accuracy,
                reliability, merchantability or fitness for a particular
                purpose, and non-infringement, or as to the Service being
                uninterrupted, error free, free of harmful components, secure,
                or not otherwise causing damage or loss of functionality or
                data.
              </p>

              <p className="text-sm">
                <strong>5.2</strong> Smart Sensor Flow, LLC. does not warrant
                the validity, accuracy, correctness, reliability, quality,
                stability, completeness or currency of any information provided
                on or through the Service.
              </p>

              <p className="text-sm">
                <strong>5.3</strong> Smart Sensor Flow, LLC. does not represent
                or warrant that use of products or services offered or displayed
                via the Service to End User does not violate any third party
                rights. Any material downloaded or otherwise obtained through
                the Services is done at your sole discretion and risk and you
                are solely responsible for any damage or loss of data that may
                result from the download of any such material.
              </p>

              <p className="text-sm">
                <strong>5.4</strong> You hereby agree to indemnify and hold
                Smart Sensor Flow, its respective affiliates, directors,
                officers and employees harmless from and against any and all
                losses, claims, liabilities which may arise from your use of the
                Service or from your breach of any of the Terms. You hereby
                further agree to indemnify and hold Smart Sensor Flow, LLC., its
                affiliates, directors, officers and employees harmless, from and
                against any and all losses, damages, claims, liabilities
                (including legal costs on a full indemnity basis) which may
                arise, directly or indirectly, as a result of any claims
                asserted by any third party claimants or other third parties
                relating to use of Smart Sensor Flow Cloud Platform by you. You
                hereby further agree that Smart Sensor Flow, LLC. is not
                responsible and shall have no liability to you, for any material
                posted or submitted by others, including defamatory, offensive
                or illicit material and that the risk of damages from such
                material rests entirely with you.
              </p>

              <div>
                <p className="text-sm mb-2">
                  <strong>5.5</strong> Smart Sensor Flow, LLC. shall not be
                  liable for any special, direct, indirect, punitive, incidental
                  or consequential damages or any damages whatsoever (including
                  but not limited to damages for loss of profits or savings,
                  business interruption, loss of information), whether in
                  contract, negligence, tort, equity or otherwise or any other
                  damages resulting from any of the following:
                </p>
                <ul className="text-sm space-y-2 ml-4">
                  <li>(a) your use or inability to use the Service;</li>
                  <li>
                    (b) your violation of any third party rights, or claims
                    against you by any party that they are entitled to defense
                    or indemnification in relation to assertions of rights,
                    demands or claims by any third party claimants;
                  </li>
                  <li>
                    (c) unauthorized access by third parties to your data or
                    private information;
                  </li>
                  <li>(d) your statements or conducts.</li>
                </ul>
              </div>

              <p className="text-sm">
                <strong>5.6</strong> Notwithstanding any of the foregoing
                provisions, unless otherwise provided in the Additional
                agreement, the aggregate liability of Smart Sensor Flow, and
                their respective employees, agents, affiliates, representatives
                or anyone acting on their behalf with respect to you for any and
                all claims arising from or in connection with the Service or any
                use or inability to use the same during any calendar year shall
                be limited to the greater of (i) the balance you have paid to
                Smart Sensor Flow, LLC. for the last month; or (ii) USD100. The
                preceding sentence shall not preclude the requirement by you to
                prove actual damages. All claims against Smart Sensor Flow, LLC.
                in respect of any of the matters referenced in this c. 5.2
                hereabove must be filed within 3 (tree) months from the date the
                cause of action arose.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Payment terms</h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>6.1</strong> By accessing the Service you agree to pay
                the recurring monthly fee for the use ("Service fee"). While
                using the Service you consent to pay by card. Pursuant to your
                use, automatic charging provided by Stripe or the selected
                payment method by Smart Sensor Flow for the subsequent billing
                period is done. Prior to charging, you will receive a few email
                notifications stating the upcoming Service fee invoice. On a due
                date you will receive the corresponding electronic invoice and
                Smart Sensor Flow, LLC. will automatically charge the Service
                fee.
              </p>

              <p className="text-sm">
                <strong>6.2</strong> Customer's obligation to pay all fees is
                non-cancellable while and for use of Service. Smart Sensor
                Flow's measurement of Customer's use of the Service is final.
              </p>

              <p className="text-sm">
                <strong>6.3</strong> Customer is responsible for any taxes, and
                Customer will pay for the Services without any reduction for
                taxes. If required Smart Sensor Flow, LLC. may provide the
                Certificate of Tax Residency to avoid double taxation.
              </p>

              <p className="text-sm">
                <strong>6.4</strong> Any invoice disputes must be submitted
                before the payment due date. If the disputed invoice has not yet
                been paid, Smart Sensor Flow may apply the credit memo amount to
                the disputed invoice and the Customer will be responsible for
                paying the resulting net balance due on that invoice. To the
                fullest extent permitted by law, Customer waives all claims
                relating to Service fee unless claimed within 60 (sixty) days
                after the invoice date. Smart Sensor Flow, LLC. does not refund
                the Service fee. Refunds (if any) are at our discretion and will
                only be in the form of credit for the Service. Nothing in this
                Agreement obligates Smart Sensor Flow, LLC. to extend credit to
                any party.
              </p>

              <p className="text-sm">
                <strong>6.5</strong> Late payments will cause the customer
                account suspension and further termination for breach of this
                SSFCP Agreement.
              </p>

              <p className="text-sm">
                <strong>6.6</strong> Unless otherwise agreed with the Customer,
                all applicable Service fees should be paid without any
                requirement to provide a purchase order number on Smart Sensor
                Flow's invoice (or otherwise).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Force Majeure</h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>7.1</strong> Under no circumstances shall Smart Sensor
                Flow, LLC. be liable for any delay or failure or disruption of
                the content or the Service resulting directly or indirectly from
                acts of nature, forces or causes beyond our reasonable control,
                including without limitation, Internet failures, computer
                viruses, cyber-attacks, telecommunications or any other
                equipment failures, electrical power failures, strikes, labour
                disputes, riots, insurrections, quarantine lockdowns, civil
                disturbances, shortages of labour or materials, fires, flood,
                storms, explosions, acts of God, war, governmental actions,
                orders of domestic or foreign courts or tribunals or
                non-performance of third parties.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              8. Notice and Procedure for Making Claims of Copyright
              Infringement
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm">
                  <strong>8.1</strong> If you believe that your work has been
                  copied in a way that constitutes copyright infringement, you
                  may provide written notice to Smart Sensor Flow, LLC. (in
                  English only) to the address, as follows:
                </p>
                <div className="mt-2 p-3 bg-gray-50 rounded border">
                  <p className="text-sm font-medium">Legal Counsel</p>
                  <p className="text-sm">
                    Smart Sensor Flow LLC, Dover, Delaware, USA
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              9. Intellectual Property Rights
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>9.1</strong> Smart Sensor Flow, LLC. is the sole owner
                of all the rights and interests in the Smart Sensor Flow Cloud
                Platform. All title, ownership and Intellectual Property Rights
                in the Smart Sensor Flow Cloud Platform shall remain with Smart
                Sensor Flow, LLC., its affiliates or licensors of Smart Sensor
                Flow Cloud's content, as the case may be.
              </p>

              <div>
                <p className="text-sm mb-2">
                  <strong>9.2</strong> "Intellectual Property Rights" shall
                  mean:
                </p>
                <ul className="text-sm space-y-2 ml-4">
                  <li>
                    (a) all rights, title and interest in and to all
                    intellectual property rights, including any and all
                    copyrights, patents, trade marks, service marks, logos,
                    get-up, trade names, internet domain names, rights in
                    designs, rights in computer software, database rights,
                    semi-conductor topography rights, utility models and rights
                    in know-how, in each case whether registrable or not, and
                    including any applications for registration, and all rights
                    or forms of protection having equivalent or similar effect
                    anywhere in the world, and across all platforms and mediums
                    whether now known or in the future invented;
                  </li>
                  <li>
                    (b) all rights under licences, consents, orders, statutes or
                    otherwise in relation to any of the rights referenced above;
                  </li>
                  <li>
                    (c) all rights of the same or similar effect or nature as or
                    to those in sub-paragraphs (a) and (b) which now or in the
                    future may subsist;
                  </li>
                  <li>
                    (d) all rights to income, royalties, damages, claims and
                    payments now or hereafter due or payable with respect
                    thereto; and
                  </li>
                  <li>
                    (e) all rights at law or in equity to sue for past or future
                    infringements of any of the foregoing rights.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. Termination</h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>10.1</strong> This SSFCP Agreement will begin on the
                date of first access to the Service and continue until the
                Agreement is terminated as stated in this Paragraph 10.
              </p>

              <p className="text-sm">
                <strong>10.2</strong> The cancelation of the Service utilization
                by you causes the termination of this agreement for convenience.
                The Customer may stop using the Services at any time. Smart
                Sensor Flow, LLC. may terminate this SSFCP Agreement for its
                convenience at any time with 30 days' prior written notice to
                the Customer.
              </p>

              <p className="text-sm">
                <strong>10.3</strong> Smart Sensor Flow Cloud Platform policies
                allow the termination of the provision of the Service to you, if
                you have not incurred corresponding Service fee for such
                Services.
              </p>

              <p className="text-sm">
                <strong>10.4</strong> Either party may terminate this SSFCP
                Agreement if (i) the other party is in material breach of the
                Agreement and fails to cure that breach within 30 (thirty) days
                after receipt of written notice or (ii) the other party ceases
                its business operations or becomes subject to insolvency
                proceedings and the proceedings are not dismissed within 90
                (ninety) days.
              </p>

              <p className="text-sm">
                <strong>10.5</strong> Termination event means that all rights
                and access to the Service are terminated for Customer (including
                access to Customer Data, if applicable), and all Service fees
                owed by Customer to Smart Sensor Flow, LLC. are immediately due
                upon receipt of the final electronic bill or as set forth in the
                final invoice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">11. General</h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>11.1</strong> The Terms constitute the entire agreement
                between you and Smart Sensor Flow, LLC. with respect to and
                governs the use of the Service, superseding any prior written or
                oral agreements in relation to the same subject matter herein.
              </p>

              <p className="text-sm">
                <strong>11.2</strong> You and Smart Sensor Flow, LLC. are
                independent contractors, and no joint venture, partnership or
                other entity, employee-employer or franchisor-franchisee
                relationship is intended or created by this Agreement.
              </p>

              <p className="text-sm">
                <strong>11.3</strong> If any term herein is adjudicated by a
                court or tribunal of competent jurisdiction to be void or
                unenforceable, the validity or enforceability of the remainder
                of the terms herein shall remain in full force and effect.
              </p>

              <p className="text-sm">
                <strong>11.4</strong> You shall not delegate, assign,
                sub-license or transfer any of the rights and/or obligations
                under this Agreement to any third party without our prior
                written consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              12. Governing Law and Dispute Resolution
            </h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong>12.1</strong> The Terms shall be governed by the laws of
                the State of Delaware, USA without regard to its conflict of law
                provisions. The parties to the Terms hereby submit to the
                exclusive jurisdiction of the courts of Delaware.
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

export default TermsAndConditionsComponent;
