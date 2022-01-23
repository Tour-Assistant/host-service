export interface HostAuthority {
  name: string;
  phone: string;
}

export interface HostedBy {
  id: string;
  name: string;
  curatedName: string;
  isFavorite?: boolean;
  isRunning?: boolean;
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
