/**
 * Performance Analyzer
 * Analyzes build output and provides recommendations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = path.join(__dirname, 'dist', 'assets');

function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

function analyzeBundle() {
  console.log('\n⚡ Performance Analysis\n');
  console.log('='.repeat(80));

  if (!fs.existsSync(distDir)) {
    console.log('❌ Build directory not found. Run: npm run build');
    return;
  }

  const files = fs.readdirSync(distDir)
    .filter(f => f.endsWith('.js'))
    .map(f => ({
      name: f,
      size: parseFloat(getFileSizeKB(path.join(distDir, f))),
      path: path.join(distDir, f),
    }))
    .sort((a, b) => b.size - a.size);

  // Categorize bundles
  const vendors = files.filter(f => f.name.includes('vendor'));
  const core = files.filter(f => f.name.includes('core-components'));
  const main = files.filter(f => f.name.includes('index-'));
  const components = files.filter(f => 
    !f.name.includes('vendor') && 
    !f.name.includes('core-components') && 
    !f.name.includes('index-')
  );

  console.log('\n📦 Bundle Categories:\n');
  
  // Vendors
  console.log('🔹 Vendor Libraries (Cached):');
  console.log('-'.repeat(80));
  let vendorTotal = 0;
  vendors.forEach(f => {
    vendorTotal += f.size;
    const emoji = f.size > 100 ? '🔴' : f.size > 50 ? '🟡' : '🟢';
    console.log(`   ${emoji} ${f.name.padEnd(50)} ${f.size.toFixed(2).padStart(10)} KB`);
  });
  console.log(`   ${'TOTAL'.padEnd(50)} ${vendorTotal.toFixed(2).padStart(10)} KB\n`);

  // Core
  if (core.length > 0) {
    console.log('🔹 Core Components (Critical):');
    console.log('-'.repeat(80));
    let coreTotal = 0;
    core.forEach(f => {
      coreTotal += f.size;
      const emoji = f.size > 50 ? '🟡' : '🟢';
      console.log(`   ${emoji} ${f.name.padEnd(50)} ${f.size.toFixed(2).padStart(10)} KB`);
    });
    console.log(`   ${'TOTAL'.padEnd(50)} ${coreTotal.toFixed(2).padStart(10)} KB\n`);
  }

  // Main
  console.log('🔹 Main Application Bundle:');
  console.log('-'.repeat(80));
  let mainTotal = 0;
  main.forEach(f => {
    mainTotal += f.size;
    const emoji = f.size > 200 ? '🔴' : f.size > 100 ? '🟡' : '🟢';
    console.log(`   ${emoji} ${f.name.padEnd(50)} ${f.size.toFixed(2).padStart(10)} KB`);
  });
  console.log(`   ${'TOTAL'.padEnd(50)} ${mainTotal.toFixed(2).padStart(10)} KB\n`);

  // Components
  console.log('🔹 Lazy-Loaded Components:');
  console.log('-'.repeat(80));
  let componentTotal = 0;
  components.forEach(f => {
    componentTotal += f.size;
    const emoji = f.size > 20 ? '🟡' : '🟢';
    console.log(`   ${emoji} ${f.name.padEnd(50)} ${f.size.toFixed(2).padStart(10)} KB`);
  });
  console.log(`   ${'TOTAL'.padEnd(50)} ${componentTotal.toFixed(2).padStart(10)} KB\n`);

  // Summary
  const total = vendorTotal + (core.length > 0 ? core.reduce((a, f) => a + f.size, 0) : 0) + mainTotal + componentTotal;
  const initialLoad = vendorTotal + (core.length > 0 ? core.reduce((a, f) => a + f.size, 0) : 0) + mainTotal;
  const lazyLoad = componentTotal;

  console.log('='.repeat(80));
  console.log('\n📊 Summary:\n');
  console.log(`   Total Bundle Size:          ${total.toFixed(2)} KB`);
  console.log(`   Initial Load (Critical):    ${initialLoad.toFixed(2)} KB (${((initialLoad/total)*100).toFixed(1)}%)`);
  console.log(`   Lazy Loaded (On Demand):    ${lazyLoad.toFixed(2)} KB (${((lazyLoad/total)*100).toFixed(1)}%)`);
  console.log(`   Estimated Gzipped:         ~${(total * 0.32).toFixed(2)} KB`);

  // Recommendations
  console.log('\n💡 Recommendations:\n');
  
  const largeFiles = files.filter(f => f.size > 150);
  if (largeFiles.length > 0) {
    console.log('   ⚠️  Large files detected:');
    largeFiles.forEach(f => {
      console.log(`      - ${f.name} (${f.size.toFixed(2)} KB)`);
    });
  }

  const largeVendor = vendors.find(f => f.size > 100);
  if (largeVendor) {
    console.log(`   ⚠️  ${largeVendor.name} is large (${largeVendor.size.toFixed(2)} KB)`);
    if (largeVendor.name.includes('animation')) {
      console.log('      → Consider lazy-loading framer-motion for animations');
    }
    if (largeVendor.name.includes('icons')) {
      console.log('      → Import only used icons instead of entire library');
    }
  }

  if (initialLoad > 300) {
    console.log('   ⚠️  Initial load is large (> 300 KB)');
    console.log('      → Consider moving more components to lazy loading');
  } else if (initialLoad < 200) {
    console.log('   ✅ Initial load is optimized (< 200 KB)');
  } else {
    console.log('   ✅ Initial load is acceptable (< 300 KB)');
  }

  if (lazyLoad / total < 0.1) {
    console.log('   💡 Consider lazy loading more components to reduce initial bundle');
  } else {
    console.log('   ✅ Good balance between initial and lazy-loaded code');
  }

  // Performance metrics
  console.log('\n⚡ Performance Estimates (3G connection):\n');
  const downloadTime3G = (initialLoad / 400).toFixed(1); // ~400 KB/s on 3G
  const downloadTime4G = (initialLoad / 5000).toFixed(2); // ~5 MB/s on 4G
  const downloadTimeWifi = (initialLoad / 12500).toFixed(2); // ~12.5 MB/s on WiFi

  console.log(`   📱 3G Network:    ~${downloadTime3G}s download time`);
  console.log(`   📶 4G/LTE:        ~${downloadTime4G}s download time`);
  console.log(`   🌐 WiFi:          ~${downloadTimeWifi}s download time`);

  console.log('\n' + '='.repeat(80));
  console.log('\n📈 Next Steps:\n');
  console.log('   1. Open dist/stats.html for visual analysis');
  console.log('   2. Run Lighthouse audit for detailed metrics');
  console.log('   3. Test on real devices with throttling');
  console.log('   4. Monitor Core Web Vitals in production\n');
}

analyzeBundle();
