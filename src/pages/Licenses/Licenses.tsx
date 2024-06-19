import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PageLayout from '../../components/PageLayout';
import { RootState, useAppDispatch } from '../../store';
import { fetchLicenses } from '../../store/slices/licenses';

const Licenses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { licenses, loading, error } = useSelector((state: RootState) => state.licenses);
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchLicenses());
    }
  }, [dispatch, token]);

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
