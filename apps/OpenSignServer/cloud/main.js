import PDF from './parsefunction/pdf/PDF.js';
import sendmailv3 from './parsefunction/sendMailv3.js';
import GoogleSign from './parsefunction/GoogleSign.js';
import ZohoDetails from './parsefunction/ZohoDetails.js';
import usersignup from './parsefunction/usersignup.js';
import FacebookSign from './parsefunction/FacebookSign.js';
import DocumentAftersave from './parsefunction/DocumentAftersave.js';
import ContactbookAftersave from './parsefunction/ContactBookAftersave.js';
import sendMailOTPv1 from './parsefunction/SendMailOTPv1.js';
import AuthLoginAsMail from './parsefunction/AuthLoginAsMail.js';
import getUserId from './parsefunction/getUserId.js';
import getUserDetails from './parsefunction/getUserDetails.js';
import getDocument from './parsefunction/getDocument.js';
import getDrive from './parsefunction/getDrive.js';
import getReport from './parsefunction/getReport.js';
import generateApiToken from './parsefunction/generateApiToken.js';
import getapitoken from './parsefunction/getapitoken.js';
import TemplateAfterSave from './parsefunction/TemplateAfterSave.js';
import GetTemplate from './parsefunction/GetTemplate.js';
import savewebhook from './parsefunction/saveWebhook.js';
import callWebhook from './parsefunction/callWebhook.js';
import SubscribeFree from './parsefunction/SubscribeFree.js';
import DocumentBeforesave from './parsefunction/DocumentBeforesave.js';
import TemplateBeforeSave from './parsefunction/TemplateBeforesave.js';
import DocumentBeforeFind from './parsefunction/DocumentAfterFind.js';
import TemplateAfterFind from './parsefunction/TemplateAfterFind.js';
import UserAfterFind from './parsefunction/UserAfterFInd.js';
import SignatureAfterFind from './parsefunction/SignatureAfterFind.js';
import getInvoices from './parsefunction/getInvoices.js';
import getPayments from './parsefunction/getPayments.js';
import getSubscriptions from './parsefunction/getSubscriptions.js';
import TenantAterFind from './parsefunction/TenantAfterFind.js';
import saveSubscription from './parsefunction/saveSubscription.js';
import VerifyEmail from './parsefunction/VerifyEmail.js';
import encryptedpdf from './parsefunction/encryptedPdf.js';
import { getSignedUrl } from './parsefunction/getSignedUrl.js';
import createBatchDocs from './parsefunction/createBatchDocs.js';
import linkContactToDoc from './parsefunction/linkContactToDoc.js';
import CreatePublicTemplate from './parsefunction/CreatePublicTemplate.js';
import GetPublicUserName from './parsefunction/GetPublicUserName.js';
import GetPublicTemplate from './parsefunction/GetPublicTemplate.js';
import ssoSignin from './parsefunction/ssoSignin.js';
import isextenduser from './parsefunction/isextenduser.js';
import getUserByOrg from './parsefunction/getUserByOrg.js';
import getUserListByOrg from './parsefunction/getUserListByOrg.js';
import TeamsAftersave from './parsefunction/TeamsAftersave.js';
import SubscriptionAftersave from './parsefunction/SubscriptionAftersave.js';
import PublicUserLinkContactToDoc from './parsefunction/PublicUserLinkContactToDoc.js';
import GetLogoByDomain from './parsefunction/GetLogobyDomain.js';
import AddAdmin from './parsefunction/AddAdmin.js';
import CheckAdminExist from './parsefunction/CheckAdminExist.js';
import UpdateExistUserAsAdmin from './parsefunction/UpdateExistUserAsAdmin.js';
import Newsletter from './parsefunction/Newsletter.js';
import getOrganizations from './parsefunction/getOrganizations.js';
import addOrganization from './parsefunction/addOrganization.js';
import updateOrganization from './parsefunction/updateOrganization.js';
import getTeams from './parsefunction/getTeams.js';
import addTeam from './parsefunction/addTeam.js';
import updateTeam from './parsefunction/updateTeam.js';
import getOrgAdmins from './parsefunction/getOrgAdmins.js';
import getAllUserTeamByOrg from './parsefunction/getAllUserTeamByOrg.js';
import AllowedUsers from './parsefunction/AlllowedUsers.js';
import BuyAddonUsers from './parsefunction/BuyAddonUsers.js';
import ExtUserAftersave from './parsefunction/ExtUserAftersave.js';
import ExtUserAfterdelete from './parsefunction/ExtUserAfterdelete.js';
import AllowedCredits from './parsefunction/AllowedCredits.js';
import BuyCredits from './parsefunction/BuyCredits.js';
import getContact from './parsefunction/getContact.js';
import updateContactTour from './parsefunction/updateContactTour.js';
import declinedocument from './parsefunction/declinedocument.js';
import addcustomsmtp from './parsefunction/addcustomsmtp.js';
import deactivateMailAdapter from './parsefunction/deactivateMailAdapter.js';
import addFileAdapter from './parsefunction/addFileAdapter.js';
import saveToFileAdapter from './parsefunction/saveToFileAdapter.js';
import getFileAdapter from './parsefunction/getFileAdapter.js';

// This afterSave function triggers after an object is added or updated in the specified class, allowing for post-processing logic.
Parse.Cloud.afterSave('contracts_Document', DocumentAftersave);
Parse.Cloud.afterSave('contracts_Contactbook', ContactbookAftersave);
Parse.Cloud.afterSave('contracts_Template', TemplateAfterSave);
Parse.Cloud.afterSave('contracts_Teams', TeamsAftersave);
Parse.Cloud.afterSave('contracts_Subscriptions', SubscriptionAftersave);
Parse.Cloud.afterSave('contracts_Users', ExtUserAftersave);

// This beforeSave function triggers before an object is added or updated in the specified class, allowing for validation or modification.
Parse.Cloud.beforeSave('contracts_Document', DocumentBeforesave);
Parse.Cloud.beforeSave('contracts_Template', TemplateBeforeSave);

// This afterFind function triggers after a query retrieves objects from the specified class, allowing for post-processing of the results.
Parse.Cloud.afterFind(Parse.User, UserAfterFind);
Parse.Cloud.afterFind('contracts_Document', DocumentBeforeFind);
Parse.Cloud.afterFind('contracts_Template', TemplateAfterFind);
Parse.Cloud.afterFind('contracts_Signature', SignatureAfterFind);
Parse.Cloud.afterFind('partners_Tenant', TenantAterFind);

// This afterDelete function triggers after an object get deleted.
Parse.Cloud.afterDelete('contracts_Users', ExtUserAfterdelete);

// This define function creates a custom Cloud Function that can be called from the client-side, enabling custom business logic on the server.
Parse.Cloud.define('signPdf', PDF);
Parse.Cloud.define('sendmailv3', sendmailv3);
Parse.Cloud.define('googlesign', GoogleSign);
Parse.Cloud.define('zohodetails', ZohoDetails);
Parse.Cloud.define('usersignup', usersignup);
Parse.Cloud.define('facebooksign', FacebookSign);
Parse.Cloud.define('SendOTPMailV1', sendMailOTPv1);
Parse.Cloud.define('AuthLoginAsMail', AuthLoginAsMail);
Parse.Cloud.define('getUserId', getUserId);
Parse.Cloud.define('getUserDetails', getUserDetails);
Parse.Cloud.define('getDocument', getDocument);
Parse.Cloud.define('getDrive', getDrive);
Parse.Cloud.define('getReport', getReport);
Parse.Cloud.define('generateapitoken', generateApiToken);
Parse.Cloud.define('getapitoken', getapitoken);
Parse.Cloud.define('getTemplate', GetTemplate);
Parse.Cloud.define('savewebhook', savewebhook);
Parse.Cloud.define('callwebhook', callWebhook);
Parse.Cloud.define('freesubscription', SubscribeFree);
Parse.Cloud.define('getinvoices', getInvoices);
Parse.Cloud.define('getpayments', getPayments);
Parse.Cloud.define('getsubscriptions', getSubscriptions);
Parse.Cloud.define('savesubscription', saveSubscription);
Parse.Cloud.define('verifyemail', VerifyEmail);
Parse.Cloud.define('encryptedpdf', encryptedpdf);
Parse.Cloud.define('getsignedurl', getSignedUrl);
Parse.Cloud.define('batchdocuments', createBatchDocs);
Parse.Cloud.define('linkcontacttodoc', linkContactToDoc);
Parse.Cloud.define('createpublictemplate', CreatePublicTemplate);
Parse.Cloud.define('getpublicusername', GetPublicUserName);
Parse.Cloud.define('getpublictemplate', GetPublicTemplate);
Parse.Cloud.define('ssosign', ssoSignin);
Parse.Cloud.define('isextenduser', isextenduser);
Parse.Cloud.define('getuserbyorg', getUserByOrg);
Parse.Cloud.define('getuserlistbyorg', getUserListByOrg);
Parse.Cloud.define('publicuserlinkcontacttodoc', PublicUserLinkContactToDoc);
Parse.Cloud.define('getlogobydomain', GetLogoByDomain);
Parse.Cloud.define('addadmin', AddAdmin);
Parse.Cloud.define('checkadminexist', CheckAdminExist);
Parse.Cloud.define('updateuserasadmin', UpdateExistUserAsAdmin);
Parse.Cloud.define('newsletter', Newsletter);
Parse.Cloud.define('getorganizations', getOrganizations);
Parse.Cloud.define('addorganization', addOrganization);
Parse.Cloud.define('updateorganization', updateOrganization);
Parse.Cloud.define('getteams', getTeams);
Parse.Cloud.define('addteam', addTeam);
Parse.Cloud.define('updateteam', updateTeam);
Parse.Cloud.define('getorgadmins', getOrgAdmins);
Parse.Cloud.define('getalluserteambyorg', getAllUserTeamByOrg);
Parse.Cloud.define('allowedusers', AllowedUsers);
Parse.Cloud.define('buyaddonusers', BuyAddonUsers);
Parse.Cloud.define('allowedcredits', AllowedCredits);
Parse.Cloud.define('buycredits', BuyCredits);
Parse.Cloud.define('getcontact', getContact);
Parse.Cloud.define('updatecontacttour', updateContactTour);
Parse.Cloud.define('declinedoc', declinedocument);
Parse.Cloud.define('addsmtp', addcustomsmtp);
Parse.Cloud.define('deactivatemailadapter', deactivateMailAdapter);
Parse.Cloud.define('savetofileadapter', saveToFileAdapter);
Parse.Cloud.define('addfileadapter', addFileAdapter);
Parse.Cloud.define('getfileadapter', getFileAdapter);
