import { makeAppointment } from './test/factories/make-appointment';

// Teste para debugar a factory
console.log('Testando factory de agendamentos atualizada...');

const appointment1 = makeAppointment({ spaceId: 'space-123' });
const appointment2 = makeAppointment({ spaceId: 'space-123' });
const appointment3 = makeAppointment({ spaceId: 'space-123' });

console.log('Appointment 1:', {
  spaceId: appointment1.spaceId,
  startTime: appointment1.startTime.toLocaleTimeString(),
  endTime: appointment1.endTime.toLocaleTimeString()
});

console.log('Appointment 2:', {
  spaceId: appointment2.spaceId,
  startTime: appointment2.startTime.toLocaleTimeString(),
  endTime: appointment2.endTime.toLocaleTimeString()
});

console.log('Appointment 3:', {
  spaceId: appointment3.spaceId,
  startTime: appointment3.startTime.toLocaleTimeString(),
  endTime: appointment3.endTime.toLocaleTimeString()
});

// Verificar se há sobreposição
const hasOverlap1_2 = (
  appointment1.startTime < appointment2.endTime &&
  appointment2.startTime < appointment1.endTime
);

const hasOverlap2_3 = (
  appointment2.startTime < appointment3.endTime &&
  appointment3.startTime < appointment2.endTime
);

const hasOverlap1_3 = (
  appointment1.startTime < appointment3.endTime &&
  appointment3.startTime < appointment1.endTime
);

console.log('Há sobreposição entre 1 e 2?', hasOverlap1_2);
console.log('Há sobreposição entre 2 e 3?', hasOverlap2_3);
console.log('Há sobreposição entre 1 e 3?', hasOverlap1_3); 