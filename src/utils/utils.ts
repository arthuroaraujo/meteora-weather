export function validateDates(startDate: string, endDate: string): string | null {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const minDate = new Date('2023-09-18');
    const maxDate = new Date('2024-03-18');
  
    if (!startDate || !endDate) {
        return 'Por favor, selecione datas de início e fim.';
    }
  
    if (endDateObj < startDateObj) {
        return 'A data final não pode ser anterior à data inicial.';
    }
  
    if (startDateObj < minDate || endDateObj > maxDate) {
        return 'As datas devem estar dentro do intervalo de 18/09/2023 a 18/03/2024.';
    }
  
    const durationInDays = (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24);
    if (durationInDays > 14) {
        return 'A duração máxima da previsão é de 14 dias.';
    }
  
    return null;
  }
  