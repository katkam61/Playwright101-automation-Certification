// import type { PlaywrightTestConfig } from '@playwright/test';
// import { json } from 'stream/consumers';

// const config: PlaywrightTestConfig = {

//     testDir: './tests',
//     // testMatch: ["tests/basicInteractions.test"],
//     use:{
//         headless: false,
//         screenshot: 'only-on-failure',
//         video: 'on',        
//     },
//     reporter: [["dot"],["json",{
//         outputFile: "jsonReports/jsonReport.json"
//     }], ["html",{
//         open: 'always'
//     }]]

// };

// export default config;
import { defineConfig } from '@playwright/test';

//Lambda Test Capabilities
 const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Test Build',
      'name': 'Playwright Test',
      'user': 'rajashekarkatkam61',
      'accessKey': 'LT_l9TgEDI1Ye5CEEogiChBUUJWgR5wJMjsoNHmoXI7sO0KRXw',
      'network': true,
      'video': true,
      'console': true
    }
  }

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    timeout: 120000,
    workers: 3,

    // testMatch: ["tests/basicInteractions.test"],

    use:{
        // connectOptions: {
        //     wsEndpoint:`wss://cdp.lambdatest.com/playwright?capabilities=
        // ${encodeURIComponent(JSON.stringify(capabilities))}`
        // },

    headless: false,
    screenshot: 'only-on-failure',
    video: 'on',        
    },

    projects: [
        {
            name: 'chromium',
            use: {browserName: 'chromium'}
        },
               {
            name: 'firefox',
            use: {browserName: 'firefox'}
        },
               {
            name: 'webkit',
            use: {browserName: 'webkit'}
        },

    ],

    reporter: [
        ["dot"],
        ["json",{
    outputFile: "jsonReports/jsonReport.json"}], 
        ["html",{
        open: 'always'}]
    ],
});

