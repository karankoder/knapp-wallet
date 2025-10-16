// src/shim.ts
// Polyfill for expo-crypto until issue with react-native-get-random-values is solved
// Apply only with Expo SDK >= 48

import { Buffer } from 'buffer';
import { getRandomValues as expoCryptoGetRandomValues } from 'expo-crypto';
require('fast-text-encoding');

// --- Global crypto polyfill ---
class Crypto {
  getRandomValues = expoCryptoGetRandomValues;
}

// eslint-disable-next-line no-undef
const webCrypto = typeof crypto !== 'undefined' ? crypto : new Crypto();

(() => {
  if (typeof crypto === 'undefined') {
    Object.defineProperty(global, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
})();

// --- Buffer polyfill ---
if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer as any;
}

// --- TextEncoder / TextDecoder polyfill ---
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as any;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as any;
}
