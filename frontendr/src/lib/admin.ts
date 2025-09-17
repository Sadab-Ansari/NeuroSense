/**
 * Admin utilities for controlling admin access
 */

// List of admin email addresses
const ADMIN_EMAILS = [
  'sadabansari451@gmail.com'
];

/**
 * Check if a user email is an admin
 * @param email - User's email address
 * @returns boolean indicating if user is an admin
 */
export function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Check if current user is an admin based on Clerk user object
 * @param user - Clerk user object
 * @returns boolean indicating if user is an admin
 */
export function isAdmin(user: any): boolean {
  if (!user) return false;
  
  const primaryEmail = user.primaryEmailAddress?.emailAddress;
  return isAdminEmail(primaryEmail);
}