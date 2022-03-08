export function pctFormatter(val) {
  return Number(val*100).toFixed(2) + '%';
};

export function scoreFormatter(val) {
  return Number(val).toFixed(2);
};

export function numberFormat(val) {
  return Number(val/1000000).toLocaleString('en-US', {maximumFractionDigits:2})+' M';
};

export function mixedFormatter(val) {
  if (val>2000){
    return Number(val/1000000).toLocaleString('en-US', {maximumFractionDigits:2})+' M';
  } else {

    return Number(val*100).toFixed(2) + '%';

  }
  
};

export function mixedFormatterOne(val) {
  if (val>1){
    return val;
  } else {

    return Number(val*100).toFixed(2) + '%';

  }
  
};

