---
title: Privacy policy
description: How Ait handles your information, connects your devices, and helps you manage your data.
lang: en
slug: privacy
updated: 2026-10-16
---

This policy covers the **Ait** desktop and mobile apps, Ait-operated account and relay services, and the website **ait-app.com**. Ait is a workspace for running and connecting AI agents on a working computer. For questions about this policy, contact **[support@ait-app.com](mailto:support@ait-app.com)**.

## Information Ait processes

The information processed depends on the features and connection method you use.

| Information | Purpose and handling |
| --- | --- |
| Project directories, files, Git changes, prompts, conversations, tool results, and terminal input/output | To run agents and display your workspace. Project files and agent runtimes reside on your working host; connected clients can access the content you use through that connection. |
| App settings, saved hosts, service addresses, and connection credentials | To remember your preferences and authenticate connections. Native account credentials use platform secure storage where available; browser clients use browser storage. Agent credentials are managed separately by their native CLIs. |
| Account identifiers, verified email address or phone number, display name, linked sign-in identity, account status, and validity period | To create or authenticate an account, control access, and associate your devices. The hosted sign-in flow uses Authing and any identity provider you choose, such as Google or WeChat. |
| Installation and node identifiers, device/host names, platform, app version, host identifiers, and connection/session status | To register devices, discover authorized hosts, and establish and revoke relay access. |
| Audio, transcripts, and files or images you choose to attach | To provide voice input, speech output, and agent context when you use those features. Audio or text may be processed by a local engine or the speech service configured on your host. Attachments may be sent to your chosen agent provider. |
| Push notification tokens, notification text, and session or routing identifiers | To deliver enabled mobile alerts through Expo and the platform’s push service. Tokens are stored on the client and registered with the working host. Notification content can include task or agent information. |
| Email address or phone number, messages, and diagnostics you send to support | To respond to requests and investigate reported problems. Please remove secrets and unrelated project content before sending a report. |

Hosting, account, and sign-in services also process network and request information, such as IP addresses and request times, to deliver the service and protect access.

## Local execution and remote connections

Local execution does not mean that every operation stays on your device. Agents communicate with their providers according to their own settings. When you connect another device, workspace content travels between the client and your working host.

Account relay forwards this traffic through the account service. The relay is a trusted intermediary; transport encryption does not make the relay end-to-end encrypted. The service can process the content passing through it, including conversations, file transfers, and terminal traffic. Direct connections use the host address and transport you configure.

If you select a self-hosted account or relay service, its operator controls that service’s data handling. See [Connections & data](/en/docs/connection/) for the connection model.

## Service providers and sharing

Data is shared as needed to operate the features you use:

- **Authentication:** Authing and your selected identity provider process sign-in information; Ait receives the identity and verified contact details needed for your account. Passwords entered on the hosted sign-in page are handled by that sign-in provider.
- **Agents and speech:** your chosen agent, model, and speech providers receive the requests, context, attachments, audio, or text needed for the tasks you initiate. Their retention and training practices depend on your provider account and configuration.
- **Notifications:** when mobile push is enabled, Expo and platform push services process device delivery tokens and notification payloads to deliver alerts.
- **Infrastructure and support:** hosting, network, and email providers process information needed to serve pages, operate account and relay connections, and handle support email.
- **Authorized devices:** clients you connect to a working host receive workspace content through that connection.

External services have their own privacy terms. Review them before sending sensitive content. We may also disclose information when legally required or necessary to protect the service and its users.

## Permissions and website storage

Features may request microphone access for voice input, camera or photo/file access for attachments, and notification permission for alerts. Use your device settings to revoke these permissions. Revoking a permission limits the related feature.

The marketing website uses no analytics scripts, advertising pixels, or non-essential cookies. Document search uses the site’s static search index. Hosting providers may keep access and security logs. The separate account console and sign-in service use storage or cookies to maintain authenticated sessions.

## Retention

Project and agent data on your working host remains under your control until you remove it. Removing a mobile app does not remove files, conversations, or provider records from that host.

Local incident evidence generated automatically by the daemon is rotated, with limits of seven days, 20 files, and 5 MiB; capacity limits may remove it sooner. It is not uploaded automatically. Exported diagnostic files and native agent logs are outside this cleanup policy and are managed by you or the corresponding tool.

Ait-operated online services do not have fixed retention periods for account records, logs, or backups. This information is retained as needed to provide the service and manage access. You can email **[support@ait-app.com](mailto:support@ait-app.com)** to request deletion of your account or associated data; see [Account and data deletion](#data-deletion) for the steps.

Device and host records are retained as needed to provide the online service and manage access. Short-lived login tickets and sessions expire; expiry or signing out is not account deletion. Support correspondence is retained as needed to handle the request and follow-up.

Some authorization and revocation records are retained to prevent disabled or deleted identities and hosts from being reactivated. Records needed for security, legal obligations, or backups may outlast account access. Contact support for the retention details applicable to your request; third-party services and your own backups have separate retention practices.

## <span id="data-deletion">Account and data deletion</span>

You can request deletion without reinstalling the app or signing in to the website:

1. Email **[support@ait-app.com](mailto:support@ait-app.com?subject=Ait%20account%20and%20data%20deletion)** with the subject **Ait account and data deletion**.
2. Provide the email address or phone number used for your Ait account and say whether you want the entire account deleted or specific data removed. For a self-hosted service, identify its operator or service address.
3. We may ask you to verify ownership. Never send passwords, verification codes, daemon tokens, or provider API keys.

Requests can cover your Ait account profile, linked sign-in identity, registered device/host information, and associated online-service data. We will explain any records that need to be retained for security or legal reasons and the applicable handling of backups. Disabling an account or signing out alone does not permanently delete these records.

To remove local workspace data, delete it on the working host and remove any copies or backups you control. Contact support if you need help identifying the data to remove. Ait account deletion does not delete your source repositories, model-provider account, or other independently managed accounts; request deletion from those providers separately.

## Your choices and security

You can disconnect hosts, sign out, stop host synchronization, revoke device permissions, and choose your own agent and service configuration. Contact support to request access to, correction of, or deletion of information held by Ait, or to raise a privacy concern. The rights available depend on your location.

The operated account service uses HTTPS/WSS and access controls. Native clients use platform secure storage when available. The security of a direct or self-hosted connection also depends on your network and configuration. Keep connection tokens private and connect only devices you trust.

## Children

Ait is intended for people using developer tools and is not directed at children under 13. The Google Play version targets adults aged 18 and over; regional store content ratings may require a higher age. If you believe a child has provided personal information to an Ait-operated service, contact support so we can investigate and address the request.

## Changes and contact

We update this page when data practices change and show the updated date above. For support, privacy questions, or data requests, email **[support@ait-app.com](mailto:support@ait-app.com)** or visit [Docs & support](/en/docs/).
