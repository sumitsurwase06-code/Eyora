import { FrameDimensions } from '../types';

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatOpticalSize = (dim: FrameDimensions): string => {
  return `${dim.lensWidth} □ ${dim.bridgeWidth} — ${dim.templeLength} mm`;
};
