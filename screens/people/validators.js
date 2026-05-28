export const validateFirstName = (firstName) => {
  if (!firstName || !firstName.trim()) return "First name is required";
  if (firstName.trim().length < 2) return "First name must be at least 2 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(firstName.trim())) return "First name has invalid characters";
  return null;
};

export const validateLastName = (lastName) => {
  if (!lastName || !lastName.trim()) return "Last name is required";
  if (lastName.trim().length < 2) return "Last name must be at least 2 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(lastName.trim())) return "Last name has invalid characters";
  return null;
};
