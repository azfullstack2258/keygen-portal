export type TokensResponse = {
  data: {
    attributes: {
      token: string;
    };
  };
};

export type AccountInfoResponse = {
  data: {
    attributes: {
      firstName: string;
    };
  };
};

export type LicenseInfo = {
  name: string;
  created: Date;
  expiry: Date;
  key: string;
  status: 'ACTIVE' | 'EXPIRED';
  id: string;
};

export type LicenseEntitlementInfo = {
  created: Date;
  name: string;
  code: string;
  id: string;
};

export type LicensesResponse = {
  data: LicenseInfo[];
};

export type LicenseEntitlementsResponse = {
  data: {
    id: Pick<LicenseEntitlementInfo, 'id'>,
    attributes: Pick<LicenseEntitlementInfo, 'created' | 'code' | 'name'>
  }[];
};

export type LicenseWithEntitlements = LicenseInfo & {
  entitlements: LicenseEntitlementInfo[]
};
