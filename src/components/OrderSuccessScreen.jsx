// @ts-nocheck
// DEMO MODE ONLY — Replace with real order confirmation logic later
// Shown after a successful simulated payment in DemoPaymentModal.
// No actual booking or fulfillment occurs.

import { CheckCircle, Clock, Package } from "lucide-react";

const ORANGE = "#FF9913";

/**
 * DEMO MODE ONLY
 * Renders the post-payment success view inside the Checkout section.
 *
 * @param {Object}   props
 * @param {Object}   props.order         - CheckoutOrder from createOrder()
 * @param {string}   props.demoRef       - demo payment reference (e.g. "DEMO-ABCD-1234")
 * @param {Object}   props.paymentMethod - PaymentMethod object from PAYMENT_METHODS
 * @param {Object}   props.theme
 */
export default function OrderSuccessScreen({ order, demoRef, paymentMethod, theme }) {
  const { border, textPrimary, textSecondary, isDark, bgCard } = theme;

  const mockOrderId = `GDX-${demoRef.replace("DEMO-", "")}`;

  return (
    <div className="space-y-5">

      {/* Success header */}
      <div className="text-center py-5">
        <CheckCircle
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: "#22C55E" }}
          strokeWidth={1.5}
        />
        <h3 className="font-condensed font-black text-3xl leading-tight" style={{ color: textPrimary }}>
          Payment Confirmed!
        </h3>
        <p className="font-body text-sm mt-2 leading-relaxed" style={{ color: textSecondary }}>
          Your add-ons selection has been recorded.
        </p>
      </div>

      {/* Payment details */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: border, backgroundColor: bgCard }}
      >
        <div
          className="px-5 py-3.5 border-b flex items-center justify-between"
          style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
        >
          <p className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>
            Order Details
          </p>
          <span
            className="font-body text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#22C55E", color: "#fff" }}
          >
            PAID
          </span>
        </div>

        <div className="px-5 py-4 space-y-3">
          <div className="flex justify-between gap-4 font-body text-sm">
            <span style={{ color: textSecondary }}>Order ID</span>
            <span className="font-bold tracking-wide" style={{ color: textPrimary }}>{mockOrderId}</span>
          </div>
          <div className="flex justify-between gap-4 font-body text-sm">
            <span style={{ color: textSecondary }}>Demo Ref</span>
            <span style={{ color: textSecondary }}>{demoRef}</span>
          </div>
          {paymentMethod && (
            <div className="flex justify-between gap-4 font-body text-sm">
              <span style={{ color: textSecondary }}>Paid via</span>
              <span className="flex items-center gap-1.5" style={{ color: textPrimary }}>
                <span>{paymentMethod.emoji}</span>
                {paymentMethod.label}
              </span>
            </div>
          )}
          <div
            className="flex justify-between gap-4 pt-3 border-t font-condensed font-black text-xl"
            style={{ borderColor: border }}
          >
            <span style={{ color: textPrimary }}>Total Paid</span>
            <span style={{ color: "#22C55E" }}>₱{order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Items purchased */}
      {order.lineItems.length > 0 && (
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: border, backgroundColor: bgCard }}
        >
          <div
            className="px-5 py-3.5 border-b flex items-center gap-2"
            style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
          >
            <Package className="w-4 h-4" style={{ color: ORANGE }} />
            <p className="font-condensed font-bold text-sm tracking-wide" style={{ color: textPrimary }}>
              Items Purchased
            </p>
          </div>
          <div className="px-5 py-4 space-y-2.5">
            {order.lineItems.map((item) => (
              <div
                key={item.lineItemId}
                className="flex justify-between gap-4 font-body text-sm"
                style={{ color: textSecondary }}
              >
                <span className="leading-snug">{item.name}</span>
                <span className="shrink-0">₱{item.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voucher status */}
      <div
        className="rounded-xl border px-5 py-4 flex gap-4 items-start"
        style={{ borderColor: border, backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA" }}
      >
        <Clock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ORANGE }} />
        <div>
          <p className="font-body text-sm font-semibold" style={{ color: textPrimary }}>
            Voucher Issuance Pending
          </p>
          <p className="font-body text-xs mt-1 leading-relaxed" style={{ color: textSecondary }}>
            Your e-voucher(s) will be sent to your registered email within 24 hours. Save your Order ID for reference.
          </p>
        </div>
      </div>

      {/* Demo notice */}
      <div
        className="rounded-xl border px-4 py-3 text-center"
        style={{ borderColor: isDark ? "#2A2A2A" : "#E5E5E5" }}
      >
        <p className="font-body text-[10px] leading-relaxed" style={{ color: textSecondary }}>
          DEMO MODE ONLY — No actual payment was processed and no real booking was made.
          For stakeholder visualization purposes only.
        </p>
      </div>

    </div>
  );
}
