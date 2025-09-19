import { useState, useEffect } from 'react';
import { wellnessAPI } from '../services';
import { CreateBienestarRequest, BienestarRegistro, AcosoCaso, CreateAcosoRequest } from '../types';

export const useWellness = () => {
  const [records, setRecords] = useState<BienestarRegistro[]>([]);
  const [emergencyCases, setEmergencyCases] = useState<AcosoCaso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await wellnessAPI.getRecords();
      setRecords(response.data);
    } catch (err) {
      setError('Error al cargar registros de bienestar');
      console.error('Error fetching wellness records:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmergencyCases = async () => {
    try {
      setLoading(true);
      const response = await wellnessAPI.getEmergencyCases();
      setEmergencyCases(response.data);
    } catch (err) {
      setError('Error al cargar casos de emergencia');
      console.error('Error fetching emergency cases:', err);
    } finally {
      setLoading(false);
    }
  };

  const createRecord = async (recordData: CreateBienestarRequest) => {
    try {
      setLoading(true);
      const response = await wellnessAPI.createRecord(recordData);
      await fetchRecords(); // Refresh the list
      return response.data;
    } catch (err) {
      setError('Error al crear registro de bienestar');
      console.error('Error creating wellness record:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createEmergencyCase = async (caseData: CreateAcosoRequest) => {
    try {
      setLoading(true);
      const response = await wellnessAPI.createEmergencyCase(caseData);
      await fetchEmergencyCases(); // Refresh the list
      return response.data;
    } catch (err) {
      setError('Error al crear caso de emergencia');
      console.error('Error creating emergency case:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEmergencyCase = async (id: string, status: string) => {
    try {
      setLoading(true);
      const response = await wellnessAPI.updateEmergencyCase(id, { estado: status as any });
      await fetchEmergencyCases(); // Refresh the list
      return response.data;
    } catch (err) {
      setError('Error al actualizar caso de emergencia');
      console.error('Error updating emergency case:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchEmergencyCases();
  }, []);

  return {
    records,
    emergencyCases,
    loading,
    error,
    createRecord,
    createEmergencyCase,
    updateEmergencyCase,
    fetchRecords,
    fetchEmergencyCases,
  };
};
