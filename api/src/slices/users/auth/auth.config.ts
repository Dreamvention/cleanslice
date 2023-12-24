export const authConfig = {
  global: true,
  secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  signOptions: { expiresIn: '86400s' },
};
