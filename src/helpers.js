export const enforceHttpsUrl = url => typeof url === 'string' ? url.replace(/^(https?:)?\/\//, 'https://') : null;
