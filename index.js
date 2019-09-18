import {
  Platform,
  NativeModules,
  Share,
} from 'react-native';

const { SharePdf } = NativeModules;

export default {
  sharePDF: async (base64Data, documentFileName) => {
    try {
      await Platform.select({
        ios: async () => {
          await Share.share({ url: `data:application/pdf;base64,${base64Data}` });
        },
        android: async () => {
          await SharePdf.share(base64Data, documentFileName);
        },
      })();
      return undefined;
    } catch (err) {
      return err;
    }
  },
};