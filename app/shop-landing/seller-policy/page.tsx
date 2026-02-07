"use client"

import { useTranslation } from "react-i18next"

export default function SellerPrivacyPolicyPage() {
   const { t } = useTranslation('shop-landing')

   return (
      <div className="min-h-screen">
         <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            <div className="text-sm sm:text-md font-normal sm:font-medium bg-white rounded-lg p-3 sm:p-10">
               <div className="mb-8 pb-2 border-b-2 border-gray-300 text-center">
                  <h1 className="text-xl sm:text-3xl font-bold text-black">{t('sellerPrivacyPolicyTitle')}</h1>
               </div>

               <div className="mb-6">
                  <p className="text-gray-700 italic">
                     For sellers who acknowledged a prior version of our Seller Privacy Policy, this version is effective from <span className="not-italic">Dec 14, 2025</span>. For sellers who had not previously acknowledged the Seller Privacy Policy, this version is effective from <span className="not-italic">Dec 5, 2025</span>.
                  </p>
               </div>

               <div className="mb-8">
                  <p className="font-bold text-gray-900 mb-3">Index</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                     <li><a href="#what_information_we_collect" className="text-orange-500 hover:underline">What Information We Collect</a></li>
                     <li><a href="#how_and_why_we_process_your_information" className="text-orange-500 hover:underline">How and Why We Process Your Information</a></li>
                     <li><a href="#how_and_why_we_share_your_information" className="text-orange-500 hover:underline">How and Why We Share Your Information</a></li>
                     <li><a href="#your_rights_and_choices" className="text-orange-500 hover:underline">Your Rights and Choices</a></li>
                     <li><a href="#children" className="text-orange-500 hover:underline">Children</a></li>
                     <li><a href="#data_security_and_retention" className="text-orange-500 hover:underline">Data Security and Retention</a></li>
                     <li><a href="#additional_terms_for_certain_jurisdictions" className="text-orange-500 hover:underline">Additional Terms for Certain Jurisdictions</a></li>
                     <li><a href="#changes_to_the_privacy_policy" className="text-orange-500 hover:underline">Changes to the Privacy Policy</a></li>
                     <li><a href="#contact_us" className="text-orange-500 hover:underline">Contact Us</a></li>
                  </ul>
               </div>

               <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                     This Seller Privacy Policy (&quot;Privacy Policy&quot;) describes how Tamu (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;) handles personal information that we collect from current and prospective sellers and their directors, officers, employees, agents, and/or representatives (each, a &quot;Seller&quot;, and collectively, the &quot;Sellers&quot;) through our digital properties that link to this Privacy Policy, including but not limited to our Seller Center websites, mobile application, and related services (collectively, the &quot;Service&quot;), and other activities as described in this Privacy Policy. At Tamu, we care deeply about privacy. We strive to be transparent about our privacy practices, including how we treat your personal information. If you interact with Tamu as a consumer, you should view the Tamu <a href="https://www.tamu.com/privacy-and-cookie-policy.html" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Privacy Policy</a> for details regarding the processing of your personal information, as this Privacy Policy only applies to personal information about you as a Seller. By continuing to use our Service, you acknowledge the practices described in this Privacy Policy.
                  </p>

                  <p>
                     This Privacy Policy explains how we collect, use, share, and otherwise process the personal information of Sellers in connection with our Service. For Sellers governed by certain specific jurisdictions, please see the &quot;<a href="#additional_terms_for_certain_jurisdictions" className="text-orange-500 hover:underline">Additional Terms for Certain Jurisdictions</a>&quot; section for additional information that apply to you.
                  </p>

                  <p>Different Tamu entities handle your personal information based on the country/region where you choose to use the Service:</p>

                  <ul className="list-disc list-inside space-y-2 ml-4">
                     <li>If you use the Service for the European Economic Area (&quot;EEA&quot;), United Kingdom (&quot;UK&quot;), or Switzerland, Whaleco Technology Limited, an Irish company, is the controller responsible for your personal information.</li>
                     <li>If you use the Service for the United States (&quot;U.S.&quot;), Whaleco Inc. is responsible for the processing of your personal information.</li>
                     <li>If you use the Service for Canada, Whaleco Canada Inc. is responsible for the processing of your personal information.</li>
                     <li>If you use the Service for any country/region other than the EEA, UK, Switzerland, U.S., or Canada, Elementary Innovation Pte. Ltd., a Singaporean company, is responsible for the processing of your personal information.</li>
                  </ul>

                  {/* What Information We Collect */}
                  <h2 id="what_information_we_collect" className="text-xl font-bold text-gray-900 pt-6">What Information We Collect</h2>
                  <p>In the course of providing and improving our Service, we collect your personal information for the purposes described in this Privacy Policy. The following are the types of personal information that we collect:</p>

                  <h3 className="text-lg font-semibold text-gray-900">Information that you provide</h3>
                  <p>When you create an account, contact us directly, or otherwise use the Service, you may provide some or all of the following information:</p>

                  <ul className="list-disc list-inside space-y-3 ml-4">
                     <li><strong>Account and profile.</strong> In order for you to create and manage a Tamu account (including when you are acting as a representative of a legal entity), we collect your mobile phone number and/or email address as the login credentials for your account and assign a user identification number to your account. You may also be required to provide information, including your first and last name, email address, physical address, phone number, demographic information (e.g., your date of birth and nationality), corporate information, tax information and documents (e.g., VAT number, tax identification number), your government-issued ID and identity documents (e.g., your passport, driver&apos;s license, or U.S. social security number), information contained on these documents (e.g., identification number and expiry date), your shop details and other information (e.g., proof of personal and/or business address). You may also choose to provide additional information about your business, such as the size of your business (e.g., the monthly online sales volume of your business).</li>
                     <li><strong>Identity verification information.</strong> Before you are able to start selling through the Service, we may ask you to provide certain information (e.g., images and/or videos) for identity verification and fraud-prevention purposes. We may also ask you to verify your identity through video calls, which may be recorded and retained, together with any transcripts generated, for verification and quality assurance purposes, in accordance with applicable laws. During your use of the Service, we may take further steps to verify your identity by requiring you to provide additional information and documents, including proof of your business address (e.g., copy of warehouse lease contract/property certificate, copy of utility bills, a video capturing your warehouse&apos;s real-time location, as applicable), or a selfie video. Please do not capture images of other individuals in such videos you provide. The information you provide may be considered biometric information, including images from identity documents and imagery of your face.</li>
                     <li><strong>Payment information.</strong> In order for you to make/receive a payment when using the Service, and to comply with applicable laws, we collect data related to your payment card information and bank information (e.g., card number, phone number, and billing address) and other bank documents (e.g., bank statements).</li>
                     <li><strong>Transactional information.</strong> In order to complete transactions and fulfill orders, we collect data related to your shipping information (e.g., address and contact phone number), order details and transaction history associated with your account, and information about refunds and complaints.</li>
                     <li><strong>Support communications.</strong> We collect communication history between you and our customers and/or us on the Service, which includes any text, images, video, audio, or supporting documents exchanged between you and our customers and/or us through our customer/seller support functions on the Service, through social media or by any other means, to assist in providing support, and to facilitate and enhance support activity.</li>
                     <li><strong>Your generated content.</strong> We collect content that you generate, transmit, or otherwise make available on the Service (including in relation to appeals to our onboarding process), such as shop logos, photos, images, videos, audio, comments, questions, messages, and other content or information, as well as associated metadata.</li>
                     <li><strong>Promotion participation.</strong> We collect certain information when you participate in a promotion, survey, questionnaire or other promotional activities we may offer from time to time through the Service, such as your participation records. In some cases, we may require additional information as part of the participation process. In addition, we collect information about your preferences for receiving marketing communications from us, as well as your interactions with them.</li>
                     <li><strong>Other information not explicitly listed in &quot;information that you provide&quot;.</strong> We may collect other information that you provide for purposes as described in this Privacy Policy or for any other purpose disclosed to you prior to or at the time we collect your information. For example, we may also collect information related to manufacturers (and responsible persons as defined under applicable product safety laws) in connection with the products you make available via our Service, in order to comply with our legal and/or business obligations. This information may amount to personal information under the laws of some jurisdictions, and you are responsible for informing the manufacturer (and the responsible persons as defined under applicable product safety laws) about such processing activities, as set out in this Privacy Policy, and ensuring that all third-party personal information disclosed to us is in compliance with applicable laws.</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900">Information from third-party sources</h3>
                  <p>To the extent permitted by applicable laws, we may receive and collect your personal information from third-party sources, such as:</p>

                  <ul className="list-disc list-inside space-y-3 ml-4">
                     <li><strong>Data providers.</strong> We receive and collect your personal information from data providers such as identity verification providers and data licensors that provide demographic and other information (e.g., Seller&apos;s names, corporate information, verification result), and bank account verification providers that provide bank account information (e.g., account holder&apos;s name, account number, IBAN), which among other purposes help us verify identity, detect fraud, and provide our Service.</li>
                     <li><strong>Marketing partners.</strong> We receive and collect your personal information from our marketing partners, such as business partners with whom we collaborate on marketing events and promotion of the Service.</li>
                     <li><strong>Public authorities, public sources, and other parties.</strong> We obtain your personal information from third party sources, such as government agencies, public records, other publicly available sources, customers of Tamu or other third parties providing information about transactions or claims they may have related to you.</li>
                     <li><strong>Other third-party services.</strong> We collect your personal information from other third-party service providers for purposes as described in this Privacy Policy, such as:
                        <ul className="list-disc list-inside ml-6 mt-2">
                           <li><strong>Logistics or warehousing service providers.</strong> To effectively complete order fulfillment, we will obtain your logistics information from these providers, such as delivery progress and delivery address, and make this information available to you within your account.</li>
                        </ul>
                     </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900">Information collected automatically</h3>
                  <p>To enhance your experience with the Service and support the other purposes for which we collect personal information as outlined in this Privacy Policy, we may automatically collect information about you, your computer, or mobile device and your interactions with the Service and our communications over time, such as:</p>

                  <ul className="list-disc list-inside space-y-3 ml-4">
                     <li><strong>Device data.</strong> We collect personal information about the device you use to access the Service, such as device model, operating system information, language settings, unique identifiers.</li>
                     <li><strong>Service usage information.</strong> We collect personal information about your interactions with the Service, including the source from which you arrived at our pages, the pages you viewed, the duration for which you visited a page, other interactions with the Service (e.g., your browsing and searching history), whether you opened our emails or clicked on the links within our emails. We also collect service-related, diagnostic, and performance information, including crash reports and performance logs.</li>
                     <li><strong>General location data.</strong> We collect your approximate location data based on your technical information (e.g., IP address).</li>
                     <li><strong>Data collected via cookies and similar technologies.</strong> We collect information via cookies and similar technologies to operate and provide the Service, including to enable your login to your Tamu account; to display the page you view; to measure and analyze how you use the Service, including your language setting, time zone; and to detect fraud and mitigate risks. Cookies and similar technologies are also used to enhance your experience with the Service and improve the Service. Pixels are very small images or pieces of data embedded in an image, also known as &quot;web beacons&quot; or &quot;clear GIFs&quot;, that recognize cookies, the time and date the page or email was viewed or opened, a description of the page on which the pixel was placed, and similar information from your computer or device.</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900">Declining to provide information</h3>
                  <p>We need to collect certain personal information from you to provide the Service and certain related services. If you do not provide the information we require to provide the Service, we cannot provide the Service. However, we also collect some optional information from you; this information is optional meaning we can still provide the Service, but without it, the quality of your experience of the Service may be affected.</p>

                  {/* How and Why We Process Your Information */}
                  <h2 id="how_and_why_we_process_your_information" className="text-xl font-bold text-gray-900 pt-6">How and Why We Process Your Information</h2>
                  <p>We process your personal information that we collect for various purposes, including but not limited to, verifying your identity, to develop, improve, support, and provide the Service, allowing you to use its features and to fulfill and enforce our Tamu Seller Services Agreement. We may use your personal information for the following purposes:</p>

                  <p><strong>Create, maintain, and manage your account.</strong> We use your personal information to create and maintain your account on the Service, enable account security features (e.g., sending security codes via email or text messages), and facilitate your invitations to persons who you want to invite to assist you in managing your account on the Service.</p>

                  <p><strong>Verify your identity and protect our business.</strong> We use your personal information to verify your identity and prevent fraud on our platform in order to protect our customers, Sellers, and our business.</p>

                  <p><strong>Orders, payments and delivery of services.</strong> We use your personal information to process orders, process payments, deliver services, process and communicate with you regarding orders, services, and promotional offers, and facilitate order disputes, refunds and/or returns of orders.</p>

                  <p><strong>Improve and optimize services and troubleshooting.</strong> We use your personal information to optimize features, analyze performance metrics, fix errors, and maintain and improve the Service and our business. As part of these activities, we may create aggregated or otherwise deidentified data based on the personal information we collect.</p>

                  <p><strong>Deidentified information.</strong> We deidentify your personal information such that it cannot reasonably be used to infer information about you or otherwise personally identify you, and we may use such deidentified information for any purpose, to the extent permitted by applicable laws. To the extent we possess or process any deidentified information, we will maintain and use such information in deidentified form and will not attempt to re-identify the information, except solely for the purpose of determining whether our deidentification process satisfies applicable legal requirements.</p>

                  <p><strong>Communicate with you and provide support.</strong> We use your personal information to communicate with you (e.g., announcements, notifications, updates, security alerts, support, and administrative messages) and provide support for your requests, questions, and feedback.</p>

                  <p><strong>Promotional activities.</strong> We use your account information and participation records to administer promotional activities.</p>

                  <p><strong>Marketing.</strong> We and our service providers collect and use your personal information for marketing purposes in accordance with applicable laws. To the extent permitted by applicable laws, we may send you direct marketing communications, such as emails and text messages. You may opt out of our marketing communications as described in the &quot;<a href="#your_rights_and_choices" className="text-orange-500 hover:underline">Your Rights and Choices</a>&quot; section below.</p>

                  <p><strong>Advertising.</strong> We may collect and use your personal information for measuring the effectiveness of the advertisements shown to you to promote the Service on third party platforms and websites, and we may share certain of your personal information with our third-party advertising partners to optimize the effectiveness of such advertisements on third-party platforms and websites in accordance with applicable laws.</p>

                  <p><strong>Fraud prevention and security.</strong> We use your personal information to prevent, detect, investigate, and respond to fraud, unauthorized access to or use of the Service, violations of the Tamu Seller Services Agreement and/or other Tamu policies, or other misconduct.</p>

                  <p><strong>Compliance, legal obligations and protection.</strong> We may use your personal information for compliance purposes and to comply with applicable laws, including lawful requests, and legal processes (e.g., responding to subpoenas or requests from government or regulatory authorities); to protect our, your, and other Sellers&apos; and customers&apos; rights, privacy, safety, or property (e.g., the establishment, exercise or defence of legal claims); to audit internal processes to ensure compliance with legal and contractual requirements and our internal policies; to enforce the terms and conditions that govern the Service; to prevent, identify, investigate, and deter fraudulent, harmful, unauthorized, unethical, or illegal activities, including cyberattacks and identity theft.</p>

                  <p><strong>Based on your consent.</strong> In some cases, we may specifically ask for your consent to collect, use, share, or otherwise process your personal information, where required by applicable laws.</p>

                  {/* How and Why We Share Your Information */}
                  <h2 id="how_and_why_we_share_your_information" className="text-xl font-bold text-gray-900 pt-6">How and Why We Share Your Information</h2>
                  <p>At Tamu, we care deeply about privacy. We may share your personal information with the following parties for the purposes outlined below:</p>

                  <p><strong>Affiliates.</strong> As a global company, our Service is supported by entities within our corporate group. We share some of your personal information with Tamu subsidiaries and affiliates as necessary to provide organizational, technical, legal and compliance support for the Service, including for the purposes of providing and optimizing services, detecting irregular activities and safeguarding our Service and/or public safety. Such personal information includes name, address, corporate information, shop details and contact information. These subsidiaries and affiliates either follow the same practices described in this Privacy Policy or follow practices at least as protective as those described in this Privacy Policy.</p>

                  <p><strong>Service providers.</strong> We share your personal information with third parties who provide services on our behalf or help us operate the Service or our business (such as information technology, identity verification, bank account verification, email/text messages delivery, fraud detection, security, compliance, and customer support). These third-party service providers only have access to personal information needed to perform their functions and services, and we require these service providers to use personal information only as necessary to perform their services or comply with applicable legal obligations.</p>

                  <p><strong>Payment processors.</strong> We share your personal information with our payment processors to assist you in the registration and certification of the payment service providers as described in our agreements, and/or to make or receive a payment when you are using the Service. Our payment processors may also process your personal information to comply with applicable laws and for compliance and risk control purposes, in which case they may act as the controllers of such personal information.</p>

                  <p><strong>Advertising partners.</strong> We may share your personal information with third-party advertising partners to optimize the effectiveness of the advertisements to promote the Service presented on third party platforms and websites in accordance with applicable laws.</p>

                  <p><strong>Third parties designated by you.</strong> We may share your personal information with third parties where you have instructed us or provided your consent to do so. We may share the personal information required for the services you request with third parties designated by you. Please be aware that when you use third-party sites or services, their own terms and privacy policies will govern your use of those sites or services.</p>

                  <p><strong>Business and marketing partners.</strong> We may share your personal information with third parties with whom we collaborate in order to offer or promote the Service. For example, depending on your communication preferences, we may share your personal information with third-party service providers with whom we have partnered in order to send you marketing communications, for example via text messages and/or emails.</p>

                  <p><strong>Professional advisors, public authorities, institutions, regulators, and third parties with legal rights.</strong> We may share your personal information with our professional advisors (e.g., lawyers, auditors, bankers and insurers), and public authorities, such as law enforcement authorities in response to legal processes (e.g., responding to subpoenas or requests from law enforcement requests); with third parties in accordance with legal requirements (e.g., name, business address and contact details to comply with legal requirements); and with other parties (including financial institutions) in order to enforce our agreements or policies, protect the rights, property and safety of Tamu, Sellers, customers, and others, and to detect, prevent and address actual or suspected fraud, violations of Tamu Seller Services Agreement, other illegal activities, security issues or when it is required by law.</p>

                  <p><strong>Business transferees.</strong> In the rare event of a business transaction such as a merger, acquisition, or reorganization, we may share some of your personal information with the relevant parties (e.g., a buyer or successor) in order to facilitate such a transaction. If we intend to transfer information about you, we will inform you either by email or by posting a notice on the Service.</p>

                  <p><strong>Other users.</strong> We share your personal information (e.g., contact details, business and shipping address) with customers for the receipt and/or delivery of products and services. Your shop details, product information, as well as certain account and profile information (e.g., name, address, contact details, VAT number, tax identification number, corporate information), may be made available to other users and the public in accordance with applicable laws.</p>

                  {/* Your Rights and Choices */}
                  <h2 id="your_rights_and_choices" className="text-xl font-bold text-gray-900 pt-6">Your Rights and Choices</h2>
                  <p>We provide you with the ability to exercise certain rights and choices regarding our collection, use, sharing and processing of your personal information. Please see the <a href="#additional_terms_for_certain_jurisdictions" className="text-orange-500 hover:underline">Additional Terms for Certain Jurisdictions</a> for additional rights you may have and how to exercise such rights in certain jurisdictions. In accordance with applicable laws, your rights and choices may include the following:</p>

                  <p><strong>Rights to access, delete and correct your personal information.</strong> You may have the right to access, delete or correct your personal information, in addition to other rights under applicable privacy laws.</p>

                  <p><strong>Withdrawal of Consent.</strong> Where we process your personal information based on consent (such as when conducting biometric identity verification before you start selling on our Service), you may withdraw your consent at any time using the details set out in the &quot;<a href="#contact_us" className="text-orange-500 hover:underline">Contact Us</a>&quot; section in this Privacy Policy. Your withdrawal of consent will not affect the lawfulness of processing based on consent before its withdrawal (please note, however, that we may still be entitled to process your personal information if we have another legal basis other than consent for doing so).</p>

                  <p><strong>Opt-out from marketing communications.</strong> To manage your preferences, opt out of or withdraw your consent to, marketing communications, you can take any of the following actions. Rest assured that you can continue to use Tamu even if you opt out of marketing communications.</p>

                  <ul className="list-disc list-inside space-y-2 ml-4">
                     <li><strong>Email promotional offers:</strong> When you provide us with your email address, we may send you certain marketing emails subject to the requirements of applicable laws. Standard data rates may apply. If you do not want to receive any marketing emails from us, you may follow the unsubscribe options at the bottom of each email to stop receiving such emails.</li>
                     <li><strong>Mobile promotional offers:</strong> When you provide us with your mobile phone number, we may send you certain marketing text messages subject to the requirements of applicable laws. Standard data and messaging rates may apply. If you no longer wish to receive any marketing text messages from us, you can follow the instructions provided in these messages.</li>
                     <li><strong>Push notifications:</strong> You may receive push notifications sent by Tamu mobile application subject to the requirements of applicable laws. Standard data rates may apply. If you no longer wish to receive marketing push notifications from us, you may adjust push notification settings on your device&apos;s notification settings.</li>
                  </ul>

                  <p><strong>Change settings for cookies and similar technologies.</strong> Most browsers let you remove or reject cookies. To do this, follow the instructions in your browser settings. Many browsers accept cookies by default until you change your settings. Please note that if you set your browser to disable cookies, the Service may not work properly. For more information about cookies and similar technologies, including how to see what cookies and similar technologies have been set on your browser and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">https://www.allaboutcookies.org</a>. You can also configure your device to prevent images from loading to prevent pixels from functioning.</p>

                  <p><strong>Links to third-party platforms.</strong> The Service may contain links to websites, mobile applications, and other online services operated by third parties. In addition, our content may be integrated into web pages or other online services that are not associated with us. However, please note that these links and integrations are not an endorsement of, or representation that we are affiliated with, any third party. Moreover, we do not control websites, mobile applications or online services operated by third parties, and we are not responsible for their actions. Therefore, we encourage you to read the policies and terms of use/service of the other websites, mobile applications and online services you use. If you revoke our ability to access information from a third-party platform, that choice will not apply to information that we have already received from that third party.</p>

                  <p><strong>Do Not Track.</strong> Some Internet browsers may be configured to send &quot;Do Not Track&quot; signals to the online services that you visit. We currently do not respond to &quot;Do Not Track&quot; or similar signals.</p>

                  {/* Children */}
                  <h2 id="children" className="text-xl font-bold text-gray-900 pt-6">Children</h2>
                  <p>To register an account on Tamu as our Seller, you must be at least 18 years old. The Service is neither intended for, nor aimed at individuals under the age of 18. We also do not knowingly collect or disclose the personal information of anyone under the age of 18. If we become aware that we have unintentionally collected personal information from a minor through the Service, we will promptly delete the information from our records. If you believe that a minor may have provided us with personal information, contact us as specified in the &quot;<a href="#contact_us" className="text-orange-500 hover:underline">Contact Us</a>&quot; section of this Privacy Policy.</p>

                  {/* Data Security and Retention */}
                  <h2 id="data_security_and_retention" className="text-xl font-bold text-gray-900 pt-6">Data Security and Retention</h2>
                  <p>The security of your personal information is important to us. We use appropriate technical and organizational measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and/or destruction. We also follow the Payment Card Industry Data Security Standard (&quot;PCI-DSS&quot;) in handling your credit card information. However, security risk is inherent in all internet and information technologies.</p>

                  <p>We generally retain personal information as long as necessary to fulfill the purposes for which we collected it or as disclosed to you at the point of collection, as well as for the purposes of satisfying any applicable legal, accounting, or reporting requirements, to establish, exercise or defend legal claims, or for fraud prevention purposes. To determine the appropriate retention period for personal information, we may consider factors such as the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure of your personal information, the purposes for which we process your personal information and whether we can achieve those purposes through other means, and the applicable legal requirements.</p>

                  <p>Data of Sellers will be stored in the infrastructure of cloud service providers. As a global one-stop shopping destination, Tamu may need to engage and share your personal information to various parties, including our service providers, as described in the &quot;<a href="#how_and_why_we_share_your_information" className="text-orange-500 hover:underline">How and Why We Share Your Information</a>&quot; section. These parties may be located in countries or jurisdictions that have data protection laws that are different in some aspects from the laws of the country or jurisdiction in which you reside. When we transfer your personal information outside the country or jurisdiction in which you reside, we implement appropriate measures to ensure that your personal information will remain protected in accordance with this Privacy Policy and applicable laws.</p>

                  {/* Additional Terms for Certain Jurisdictions */}
                  <h2 id="additional_terms_for_certain_jurisdictions" className="text-xl font-bold text-gray-900 pt-6">Additional Terms for Certain Jurisdictions</h2>
                  <p>Certain jurisdictions have additional terms described below under applicable laws. If you use the Service for, or reside in, any jurisdiction set out below, the additional terms outlined below apply to you in addition to the other terms of this Privacy Policy. In case of any conflicts between the other terms of this Privacy Policy and the applicable additional terms described below, the terms described below shall govern.</p>

                  <ul className="list-disc list-inside space-y-2 ml-4">
                     <li><a href="#" className="text-orange-500 hover:underline">Australia</a></li>
                     <li><a href="#" className="text-orange-500 hover:underline">Brazil</a></li>
                     <li><a href="#" className="text-orange-500 hover:underline">California</a></li>
                     <li><a href="#" className="text-orange-500 hover:underline">Canada</a></li>
                     <li><a href="#" className="text-orange-500 hover:underline">EEA, UK, Switzerland</a></li>
                     <li><a href="#" className="text-orange-500 hover:underline">Mexico</a></li>
                     <li><a href="#" className="text-orange-500 hover:underline">Republic of Korea</a></li>
                     <li><a href="#" className="text-orange-500 hover:underline">Turkey</a></li>
                     <li><a href="#" className="text-orange-500 hover:underline">United Arab Emirates</a></li>
                  </ul>

                  {/* Changes to the Privacy Policy */}
                  <h2 id="changes_to_the_privacy_policy" className="text-xl font-bold text-gray-900 pt-6">Changes to the Privacy Policy</h2>
                  <p>We reserve the right to modify this Privacy Policy at any time. If we make material changes to this Privacy Policy, we will notify you by updating the date of this Privacy Policy, posting it on the Service, or providing any notice required by applicable laws. Any modifications to this Privacy Policy will be effective from the time of posting the modified version (or as otherwise indicated at the time of posting). We recommend that you review the Privacy Policy each time you visit our Service to stay informed of our privacy practices.</p>

                  <p>The translated versions of this Privacy Policy are provided for your convenience. If there are any discrepancies between the English version and versions in other languages, to the extent permitted by applicable laws, the English version shall always prevail and govern your relationship with us.</p>

                  {/* Contact Us */}
                  <h2 id="contact_us" className="text-xl font-bold text-gray-900 pt-6">Contact Us</h2>
                  <p>If you have any questions or comments about our Privacy Policy or the terms mentioned, you may contact us at any time by using the details below or referenced in the additional terms in the links under the &quot;<a href="#additional_terms_for_certain_jurisdictions" className="text-orange-500 hover:underline">Additional Terms for Certain Jurisdictions</a>&quot; section.</p>

                  <p>For non-EEA/UK/Switzerland residents, please send an email to <a href="mailto:sellersupport@tamu.com" className="text-orange-500 hover:underline">sellersupport@tamu.com</a>.</p>
               </div>

               {/* Footer */}
               <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                     &copy; 2025 {t('copyright')}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
