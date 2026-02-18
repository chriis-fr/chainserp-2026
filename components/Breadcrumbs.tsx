import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import StructuredData, { BreadcrumbItem } from './StructuredData';

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

export default function Breadcrumbs({ items, showHome = true }: BreadcrumbsProps) {
  const router = useRouter();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = router.asPath.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = showHome ? [{ name: 'Home', url: '/' }] : [];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({
        name,
        url: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = getBreadcrumbs();

  if (breadcrumbItems.length <= 1) return null;

  return (
    <>
      <StructuredData type="BreadcrumbList" data={breadcrumbItems} />
      <Wrapper aria-label="Breadcrumb">
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={item.url}>
              {index < breadcrumbItems.length - 1 ? (
                <BreadcrumbLink href={item.url}>{item.name}</BreadcrumbLink>
              ) : (
                <BreadcrumbCurrent aria-current="page">{item.name}</BreadcrumbCurrent>
              )}
              {index < breadcrumbItems.length - 1 && <Separator aria-hidden="true">/</Separator>}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  margin: 2rem 0;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.5rem;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BreadcrumbLink = styled(Link)`
  color: rgb(var(--primary));
  text-decoration: none;
  font-size: 1.4rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const BreadcrumbCurrent = styled.span`
  color: rgb(var(--text));
  font-size: 1.4rem;
  font-weight: 600;
`;

const Separator = styled.span`
  color: rgb(var(--textSecondary));
  font-size: 1.4rem;
`;
