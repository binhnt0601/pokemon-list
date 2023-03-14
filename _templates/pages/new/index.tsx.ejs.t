---
to: src/pages/<%= name %>/index.tsx
---
import { BasePageProps } from 'utils/component';

const IndexPage: React.FC<BasePageProps> = ({ children }) => <div>{children}</div>;

export default IndexPage;
