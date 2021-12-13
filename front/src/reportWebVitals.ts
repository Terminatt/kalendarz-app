import { ReportHandler } from 'web-vitals';

const reportWebVitals = async (onPerfEntry?: ReportHandler): Promise<void> => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        try {
            await import('web-vitals').then(({
                getCLS, getFID, getFCP, getLCP, getTTFB,
            }) => {
                getCLS(onPerfEntry);
                getFID(onPerfEntry);
                getFCP(onPerfEntry);
                getLCP(onPerfEntry);
                getTTFB(onPerfEntry);
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('There was a problem while importing web-vitals');
        }
    }
};

export default reportWebVitals;
