import { prisma } from '@/lib/prisma';
import ProductsClient from './ProductsClient';
import { PackageIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { sku: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PackageIcon /> Product Master
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage the unified catalog of goods, materials, and services.</p>
        </div>
        <div>
          <button className="btn-primary">Add Product</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px' }}>
        <ProductsClient products={products} />
      </div>
    </div>
  );
}
