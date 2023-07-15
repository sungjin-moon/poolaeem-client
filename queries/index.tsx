import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

interface Props {
  children: React.ReactElement;
}

function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
