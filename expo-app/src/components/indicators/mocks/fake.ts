const status = ['Moyen', 'Faible', 'Attentif'];
const color = {
  Moyen: '#4FCBAD',
  Faible: '#9DF5F0',
  Attentif: '#FFF78B',
};

export function randomIndicatorData() {
  const currentStatus = status[Math.floor(Math.random() * status.length)];
  return {
    status: currentStatus,
    // @ts-ignore
    color: color[currentStatus],
    value: Math.floor(Math.random() * 100),
  };
}
