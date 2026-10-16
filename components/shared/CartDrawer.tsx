"use client";
import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Minus, Plus, Trash2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useCart } from "@/lib/context/CartContext";
import { formatPrice } from "@/lib/api/products";
import { submitContactRequest } from "@/lib/api/contact";

type Step = "cart" | "checkout" | "success";

const CartDrawer = () => {
    const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
    const tCart = useTranslations("cart");
    const tOrder = useTranslations("quickOrder");
    const params = useParams();
    const locale = (params?.locale as string) || "ru";

    const [step, setStep] = useState<Step>("cart");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        closeCart();
        setStep("cart");
        setName("");
        setPhone("");
        setNote("");
        setPhoneError(false);
        setError(false);
    };

    const buildOrderMessage = () => {
        const lines = items.map(
            (item) => `• ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity, locale)}`
        );
        lines.push(`\n${tCart("total")}: ${formatPrice(totalPrice, locale)}`);
        if (note.trim()) lines.push(`\n${note.trim()}`);
        return lines.join("\n");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidPhoneNumber(phone)) {
            setPhoneError(true);
            return;
        }
        setPhoneError(false);
        setIsSubmitting(true);
        setError(false);

        try {
            await submitContactRequest(
                { name, phone, message: buildOrderMessage(), type: "PURCHASE" },
                locale
            );
            clearCart();
            setStep("success");
        } catch {
            setError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {step === "cart" ? tCart("title") : tOrder("title")}
                    </h3>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-900 transition" aria-label="Close">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {step === "success" && (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "#0A7EED" }}>
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{tOrder("success.title")}</h4>
                        <p className="text-gray-700">{tOrder("success.message")}</p>
                    </div>
                )}

                {step === "cart" && (
                    items.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-600 mb-4">{tCart("empty")}</p>
                            <Link
                                href={`/${locale}/catalog`}
                                onClick={handleClose}
                                className="inline-block px-6 py-3 rounded-xl font-bold text-white"
                                style={{ background: "#0A7EED" }}
                            >
                                {tCart("browseCatalog")}
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-center">
                                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-gray-900 line-clamp-2">{item.name}</p>
                                            <p className="text-sm text-gray-600">{formatPrice(item.price, locale)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                                                aria-label="Decrease"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                                                aria-label="Increase"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition"
                                            aria-label={tCart("remove")}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mb-6 pt-4 border-t">
                                <span className="font-semibold text-gray-900">{tCart("total")}</span>
                                <span className="text-xl font-bold" style={{ color: "#0A7EED" }}>
                                    {formatPrice(totalPrice, locale)}
                                </span>
                            </div>

                            <button
                                onClick={() => setStep("checkout")}
                                className="w-full px-6 py-4 rounded-xl font-bold text-white transition"
                                style={{ background: "#0A7EED" }}
                            >
                                {tCart("checkout")} ({totalItems})
                            </button>
                        </>
                    )
                )}

                {step === "checkout" && (
                    <>
                        <p className="text-gray-600 mb-4">{tOrder("subtitle")}</p>

                        {error && (
                            <div className="mb-4 rounded-2xl border-2 border-red-300 bg-red-50 p-3 text-red-700">
                                <p className="font-semibold text-sm">{tOrder("error.title")}</p>
                                <p className="text-sm">{tOrder("error.message")}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">{tOrder("name.label")}</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder={tOrder("name.placeholder")}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white focus:outline-none transition"
                                    style={{ borderColor: "#E5E7EB" }}
                                    onFocus={(e) => (e.target.style.borderColor = "#0A7EED")}
                                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">{tOrder("phone.label")}</label>
                                <PhoneInput
                                    className="cart-phone-input w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus-within:bg-white transition"
                                    style={{ borderColor: phoneError ? "#DC2626" : "#E5E7EB" }}
                                    international
                                    limitMaxLength
                                    defaultCountry="UZ"
                                    value={phone}
                                    onChange={(value) => {
                                        setPhone(value ?? "");
                                        setPhoneError(false);
                                    }}
                                    required
                                    placeholder={tOrder("phone.placeholder")}
                                />
                                {phoneError && <p className="mt-2 text-sm text-red-600">{tOrder("phone.invalid")}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">{tOrder("message.label")}</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    rows={3}
                                    placeholder={tOrder("message.placeholder")}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white focus:outline-none resize-none transition"
                                    style={{ borderColor: "#E5E7EB" }}
                                    onFocus={(e) => (e.target.style.borderColor = "#0A7EED")}
                                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStep("cart")}
                                    className="px-6 py-4 rounded-xl font-bold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                                >
                                    {tCart("backToCart")}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-4 rounded-xl font-bold text-white transition disabled:opacity-50"
                                    style={{ background: isSubmitting ? "#94a3b8" : "#0A7EED" }}
                                >
                                    {isSubmitting ? tOrder("submitting") : tOrder("submit")}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
