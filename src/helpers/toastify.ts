import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig: any = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
};

/**
 * Custom toastify
 * 
 * @param message 
 * @param type 
 * @param config 
 * @returns 
 */
const toastify = (message: string, type: string, config = toastConfig) => {
    switch (type) {
        case 'INFO':
            toast.info(message, config);
            return '';
        case 'SUCCESS':
            toast.success(message, config);
            return '';
        case 'WARNING':
            toast.warn(message, config);
            return '';
        case 'ERROR':
            toast.error(message, config);
            return '';
        default:
            toast(message, config);
            return '';
    }
};

export default toastify;
