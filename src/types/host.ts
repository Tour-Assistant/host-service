export interface HostAuthority {
  name: string;
  phone: string;
}

export interface HostedBy {
  id: string;
  name: string;
  link: {
    page: string;
    group: string;
  };
  authorities: HostAuthority[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateHostPostRequest {
  body: {
    title: string;
    startAt: string;
  };
}
