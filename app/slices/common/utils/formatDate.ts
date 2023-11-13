export const formatDate = (date: string) => {
  const { d } = useI18n();
  return d(new Date(date), 'short');
};
