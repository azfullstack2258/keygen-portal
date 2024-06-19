import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosHeaders } from 'axios';

import { PageLayout } from '../../components';
import { RootState } from '../../store';
import apiClient from '../../lib/api/apiClient';
import {
  LicenseWithEntitlements,
  LicenseEntitlementsResponse,
  LicensesResponse,
} from '../../typings/api';

const Licenses: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const [licenses, setLicenses] = useState<LicenseWithEntitlements[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const { data: licensesData } = await apiClient.get<LicensesResponse>(
          '/licenses',
          {
            headers: new AxiosHeaders({
              Authorization: `Bearer ${token}`,
            }),
          }
        );
        const licenses = licensesData.data;

        const licensesWithEntitlements = await Promise.all(
          licenses.map(async (license: any) => {
            const { data: entitlementsData } =
              await apiClient.get<LicenseEntitlementsResponse>(
                `/licenses/${license.id}/entitlements`,
                {
                  headers: new AxiosHeaders({
                    Authorization: `Bearer ${token}`,
                  }),
                }
              );
            return { ...license, entitlements: entitlementsData.data };
          })
        );

        setLicenses(licensesWithEntitlements);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch licenses.');
        setLoading(false);
      }
    };

    fetchLicenses();
  }, [token]);

  return (
    <PageLayout>
      {loading ? (
        <div className="text-white">Loading...</div>
        ) : error ? (
          <div className="text-white">{error}</div>
          ) : (
            <div className="flex flex-col">

        <h1 className="text-2xl font-bold mb-4 text-white">Licenses</h1>
        <table className="w-full table-auto border-collapse text-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Expires At</th>
              <th className="border px-4 py-2">Entitlements</th>
            </tr>
          </thead>
          <tbody>
            {licenses?.map((license) => (
              <tr key={license.id}>
                <td className="border px-4 py-2">{license.attributes.name}</td>
                <td className="border px-4 py-2">
                  {new Date(license.attributes.created).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(license.attributes.expiry).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <ul>
                    {license.entitlements.map((entitlement: any) => (
                      <li key={entitlement.id}>
                        {entitlement.attributes.name}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </PageLayout>
  );
};

export default Licenses;
