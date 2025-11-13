-- DropForeignKey
ALTER TABLE "DetallePedido" DROP CONSTRAINT "DetallePedido_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "MultimediaProducto" DROP CONSTRAINT "MultimediaProducto_productoId_fkey";

-- DropForeignKey
ALTER TABLE "VarianteProducto" DROP CONSTRAINT "VarianteProducto_productoId_fkey";

-- AlterTable
ALTER TABLE "VarianteProducto" ADD COLUMN     "inStock" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "VarianteProducto" ADD CONSTRAINT "VarianteProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultimediaProducto" ADD CONSTRAINT "MultimediaProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;
