export const validateName = (name) => {
  if (!name || !name.trim()) return "Restaurant name is required";
  if (name.trim().length < 2) return "Restaurant name must be at least 2 characters";
  if (!/^[a-zA-Z0-9\s,'-]*$/.test(name.trim())) {
    return "Restaurant name has invalid characters";
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return "Phone is required";
  const normalized = phone.replace(/[^\d+()-\s]/g, "");
  if (!/^[0-9+\-()\s]{7,20}$/.test(normalized)) return "Enter a valid phone number";
  return null;
};

export const validateAddress = (address) => {
  if (!address || !address.trim()) return "Address is required";
  if (address.trim().length < 5) return "Address is too short";
  return null;
};

export const validateWebsite = (website) => {
  if (!website || !website.trim()) return "Website is required";
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
  if (!urlRegex.test(website.trim())) return "Enter a valid website URL";
  return null;
};
