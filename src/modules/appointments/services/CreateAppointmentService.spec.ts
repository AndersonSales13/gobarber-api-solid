import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointement = await createAppointment.execute({
      date: new Date(),
      provider_id: '123151561',
    });

    expect(appointement).toHaveProperty('id');
    expect(appointement.provider_id).toBe('123151561');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123151561',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123151561',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
