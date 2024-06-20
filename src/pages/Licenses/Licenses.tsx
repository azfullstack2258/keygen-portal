import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PageLayout from '../../components/PageLayout';
import { Table } from '../../components/shared';
import { RootState, useAppDispatch } from '../../store';
import { fetchLicenses } from '../../store/slices/licenses';
import {
  LicenseEntitlementInfo,
  LicenseWithEntitlements,
} from '../../typings/api';
import { Column } from '../../typings/ui';

const Licenses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { licenses, loading, error } = useSelector(
    (state: RootState) => state.licenses
  );
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchLicenses());
    }
  }, [dispatch, token]);

  const columns: Column<LicenseWithEntitlements>[] = [
    {
      header: 'Name',
      accessor: 'name' as keyof LicenseWithEntitlements,
    },
    {
      header: 'Created At',
      accessor: 'created' as keyof LicenseWithEntitlements,
      render: (value: LicenseWithEntitlements[keyof LicenseWithEntitlements]) => new Date(value as Date).toLocaleString(),
    },
    {
      header: 'Expires At',
      accessor: 'expiry' as keyof LicenseWithEntitlements,
      render: (value: LicenseWithEntitlements[keyof LicenseWithEntitlements]) => new Date(value as Date).toLocaleString(),
    },
    {
      header: 'Entitlements',
      accessor: 'entitlements' as keyof LicenseWithEntitlements,
      render: (entitlements: LicenseWithEntitlements[keyof LicenseWithEntitlements]) => (
        <ul>
          {(entitlements as LicenseEntitlementInfo[]).map((entitlement: LicenseEntitlementInfo) => (
            <li key={entitlement.id}>{entitlement.name}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <PageLayout>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : error ? (
        <div className="text-white">{error}</div>
      ) : (
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4 text-white">Licenses</h1>
          <Table<LicenseWithEntitlements>
            data={licenses || []}
            columns={columns}
            pageSize={5}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default Licenses;
