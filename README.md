# AEON Bank Mobile Assessment

A React Native mobile application for viewing and sharing banking transaction details.

Built as part of the **AEON Bank Mobile Engineer Assessment** using React Native, TypeScript, Zustand, and React Navigation.

## Features

* View the provided incoming and outgoing transactions
* Display transfer name, recipient, date, and amount
* Clearly distinguish incoming and outgoing amounts
* Pull to refresh transactions
* View detailed transaction information
* Navigate between transaction list and transaction details
* Share transaction details using the device's native sharing functionality
* Loading, error, and empty states
* Type-safe navigation with TypeScript
* Mock transaction service representing the provided backend response

## Tech Stack

* React Native `0.82.1`
* React `19.1.1`
* TypeScript `5.8.3`
* Zustand `5.0.15`
* React Navigation `7`
* React Native `Share` API
* Jest
* ESLint

## Project Structure

```text
src/
├── components/
│   └── TransactionListItem.tsx
│
├── navigation/
│   └── AppNavigator.tsx
│
├── screens/
│   ├── Transactions/
│   │   └── TransactionsScreen.tsx
│   └── TransactionDetails/
│       └── TransactionDetailsScreen.tsx
│
├── services/
│   └── transactionService.ts
│
├── store/
│   └── transactionStore.ts
│
├── types/
│   └── transaction.ts
│
└── utils/
    └── formatters.ts
```

### Architecture

The application follows a simple separation of responsibilities:

* **Screens** handle screen-level UI and user interaction.
* **Components** contain reusable UI components.
* **Services** provide the transaction data layer. The current implementation uses mock data to simulate the backend response.
* **Zustand store** manages transaction state, loading state, and errors.
* **Types** contain shared TypeScript models.
* **Utilities** contain reusable formatting functions.
* **React Navigation** handles navigation between the transaction list and details screens.

## Getting Started

### Prerequisites

Make sure the development environment is configured for React Native.

Required tools include:

* Node.js `20` or later
* npm
* Android Studio for Android development
* Android SDK
* Android Emulator or a physical Android device
* Xcode and CocoaPods for iOS development on macOS

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/RukshanRanabahu/aeon-bank-mobile-assessment.git
cd aeon-bank-mobile-assessment
npm install
```

### Start Metro

Start the React Native Metro bundler:

```bash
npm start
```

Keep Metro running in this terminal.

### Run on Android

Open another terminal in the project directory:

```bash
npm run android
```

The application can also be launched directly from Android Studio using an Android emulator.

### Run on iOS

Install iOS dependencies:

```bash
bundle install
bundle exec pod install
```

Then run:

```bash
npm run ios
```

## Application Flow

### 1. Transaction List

The application starts on the Transactions screen.

Each transaction displays:

* Transfer name
* Recipient name
* Transfer date
* Transfer amount

Incoming and outgoing amounts are visually differentiated.

The list also supports pull-to-refresh.

### 2. Transaction Details

Selecting a transaction navigates to the Transaction Details screen.

The details screen displays:

* Reference ID
* Transfer name
* Transfer date
* Recipient name
* Transfer amount

### 3. Share Transaction

The **Share Transaction** button uses React Native's native `Share` API.

The user can share the transaction information through any compatible sharing application available on the device.

## Mock Data

The application currently uses a mock service to simulate the backend response provided in the assessment.

Example transaction:

```typescript
{
    refId: '123ABC',
    transferDate: '2024-10-15T12:34:56Z',
    recipientName: 'John Doe',
    transferName: 'Salary Payment',
    amount: 1500.0,
}
```

Negative amounts are supported for outgoing/refund transactions:

```typescript
{
    refId: '789GHI',
    transferDate: '2024-10-05T16:18:30Z',
    recipientName: 'Robert Brown',
    transferName: 'Refund',
    amount: -500.0,
}
```

The service layer is intentionally separated from the UI so that the mock implementation can later be replaced with a real backend API without requiring significant changes to the screens.

## Available Scripts

### Start Metro

```bash
npm start
```

### Run Android

```bash
npm run android
```

### Run iOS

```bash
npm run ios
```

### Run ESLint

```bash
npm run lint
```

### Run Tests

```bash
npm test
```

## Code Quality

The project uses TypeScript and ESLint to maintain consistency and catch common issues.

Before committing changes, the implementation was validated using:

```bash
npm run lint
```

The lint check passes successfully.

The transaction list and transaction details flows were also manually tested on an Android emulator, including:

* Loading transactions
* Displaying all mock transactions
* Opening transaction details
* Displaying transaction information
* Incoming amount formatting
* Outgoing amount formatting
* Opening the native Android share sheet
* Pull-to-refresh

## Testing Note

The current Jest test suite encounters a configuration issue when loading the ES module build of `@react-navigation/native`.

The failure occurs before any tests are executed:

```text
SyntaxError: Unexpected token 'export'
```

This is related to Jest's transformation of the React Navigation dependency rather than the transaction implementation itself.

ESLint passes successfully, and the implemented application flow has been manually verified on the Android emulator.

## Git Commit History

The implementation was developed through incremental, logical commits to keep the development progression and thought process clear.

The main development stages were:

```text
chore: install navigation and state management dependencies
feat: add transaction navigation and state management
feat: implement transactions list
feat: add transaction details and sharing
```

The work was separated into focused commits covering dependency setup, application architecture, transaction list implementation, and transaction details with native sharing. This makes the development history easy to review and understand.

## Future Improvements

If this application were developed beyond the scope of the assessment, the following improvements could be considered:

* Replace mock data with a real backend API
* Add pagination for large transaction histories
* Add transaction filtering and search
* Add automated unit and component tests
* Add API error/retry handling
* Add authentication and secure session handling
* Add accessibility improvements
* Add automated CI checks for linting, testing, and builds
* Add visual regression testing
* Improve transaction detail sharing with richer platform-specific share content

## Assessment Requirements

The implementation covers the requested assessment functionality:

* Transaction list: implemented
* Transfer details: implemented
* Transfer date: implemented
* Transfer amount: implemented
* Incoming and outgoing transactions: implemented
* Transaction details screen: implemented
* Reference ID: implemented
* Recipient name: implemented
* External sharing: implemented
* React Native: implemented
* TypeScript: implemented
* Zustand state management: implemented
* Project documentation: included
* Logical Git commits: included
