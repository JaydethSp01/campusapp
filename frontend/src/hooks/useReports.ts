import { useState, useEffect } from 'react';
import { reportsAPI } from '../services';
import { CreateReporteRequest, ReporteDanio, Instalacion } from '../types';

export const useReports = () => {
  const [reports, setReports] = useState<ReporteDanio[]>([]);
  const [installations, setInstallations] = useState<Instalacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getAll();
      setReports(response.data);
    } catch (err) {
      setError('Error al cargar reportes');
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstallations = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getInstalaciones();
      setInstallations(response.data);
    } catch (err) {
      setError('Error al cargar instalaciones');
      console.error('Error fetching installations:', err);
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (reportData: CreateReporteRequest) => {
    try {
      setLoading(true);
      const response = await reportsAPI.create(reportData);
      await fetchReports(); // Refresh the list
      return response.data;
    } catch (err) {
      setError('Error al crear reporte');
      console.error('Error creating report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (id: string, status: string, observacion?: string) => {
    try {
      setLoading(true);
      const response = await reportsAPI.updateStatus(id, status, observacion);
      await fetchReports(); // Refresh the list
      return response.data;
    } catch (err) {
      setError('Error al actualizar reporte');
      console.error('Error updating report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchInstallations();
  }, []);

  return {
    reports,
    installations,
    loading,
    error,
    createReport,
    updateReportStatus,
    fetchReports,
    fetchInstallations,
  };
};
