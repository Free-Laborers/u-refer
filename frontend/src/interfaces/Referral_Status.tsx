export const Referral_Status = {
    OPEN: 'OPEN',
    CONTACTED: 'CONTACTED',
    REJECTED: 'REJECTED',
    HIRED: 'HIRED',
    DELETED: 'DELETED'
  };
  
  export type Referral_Status = (typeof Referral_Status)[keyof typeof Referral_Status]