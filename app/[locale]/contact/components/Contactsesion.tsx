"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetchTeamMembers, TeamMemberResponseDTO } from "@/lib/api/team";

const ContactSection = () => {
    const t = useTranslations("contact");
    const params = useParams();
    const locale = params?.locale as string || 'ru';

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Fetch team members with SWR
    const { data: teamMembers, error, isLoading } = useSWR(
        `/api/team/public?locale=${locale}`,
        () => fetchTeamMembers(locale),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
        }
    );

    // Map API response to component format
    const contactPersons = teamMembers && teamMembers.length > 0
        ? teamMembers.map(member => ({
            name: member.name,
            phone: member.phoneNumber,
            position: member.role,
            image: member.image.url
        }))
        : [];

    const [selectedPerson, setSelectedPerson] = useState<typeof contactPersons[0] | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: "", phone: "", message: "" });
            setTimeout(() => setSubmitted(false), 5000);
        }, 2000);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: "#0A7EED" }}>
                        {t("title")}
                    </h1>
                    <p className="text-xl text-gray-800">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Form + Info Cards */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border-2" style={{ borderColor: "#0A7EED" }}>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("form.title")}</h2>

                        {submitted ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: "#0A7EED" }}>
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("form.success.title")}</h3>
                                <p className="text-gray-800 text-lg">
                                    {t("form.success.message").split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i === 0 && <br />}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("form.name.label")}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder={t("form.name.placeholder")}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white focus:outline-none transition"
                                        style={{ borderColor: "#E5E7EB" }}
                                        onFocus={(e) => e.target.style.borderColor = "#0A7EED"}
                                        onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("form.phone.label")}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder={t("form.phone.placeholder")}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white focus:outline-none transition"
                                        style={{ borderColor: "#E5E7EB" }}
                                        onFocus={(e) => e.target.style.borderColor = "#0A7EED"}
                                        onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("form.message.label")}</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        placeholder={t("form.message.placeholder")}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white focus:outline-none resize-none transition"
                                        style={{ borderColor: "#E5E7EB" }}
                                        onFocus={(e) => e.target.style.borderColor = "#0A7EED"}
                                        onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-5 rounded-2xl font-bold text-white text-lg transition disabled:opacity-50"
                                    style={{ background: isSubmitting ? "#94a3b8" : "#0A7EED" }}
                                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.background = "#0865C4")}
                                    onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.background = "#0A7EED")}
                                >
                                    {isSubmitting ? t("form.submitting") : (
                                        <span className="flex items-center justify-center gap-3">
                                            <Send className="w-6 h-6" />
                                            {t("form.submit")}
                                        </span>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-6">
                        {/* Address */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 cursor-pointer hover:shadow-2xl transition" style={{ borderColor: "#0A7EED" }}>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Город+Каган+ул.+Махмуд+Торобий+183+Bukhara+Region+Uzbekistan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-6"
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#0A7EED" }}>
                                    <MapPin className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("info.office.title")}</h3>
                                    <p className="text-lg leading-relaxed hover:underline" style={{ color: "#0A7EED" }}>
                                        {t("info.office.address").split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                {i === 0 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            </a>
                        </div>

                        {/* Email */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border-2" style={{ borderColor: "#0A7EED" }}>
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#0A7EED" }}>
                                    <Mail className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("info.email.title")}</h3>
                                    <a href="mailto:atlant-fortuna@mail.ru" className="text-xl font-semibold" style={{ color: "#0A7EED" }}>
                                        atlant-fortuna@mail.ru
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border-2" style={{ borderColor: "#0A7EED" }}>
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#0A7EED" }}>
                                    <Clock className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("info.hours.title")}</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-800 font-medium">{t("info.hours.weekdays")}</span>
                                            <span className="text-gray-900 font-bold">09:00 - 18:00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-800 font-medium">{t("info.hours.saturday")}</span>
                                            <span className="text-gray-900 font-bold">09:00 - 14:00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-800 font-medium">{t("info.hours.sunday")}</span>
                                            <span className="text-red-600 font-bold">{t("info.hours.dayOff")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={{ color: "#0A7EED" }}>
                            {t("team.title")}
                        </h2>
                        <p className="text-xl text-gray-800">{t("team.subtitle")}</p>
                    </div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="bg-white rounded-3xl p-6 shadow-xl border-2 animate-pulse" style={{ borderColor: "#0A7EED" }}>
                                    <div className="text-center space-y-4">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-gray-200"></div>
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                                        <div className="h-10 bg-gray-200 rounded"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {contactPersons.map((person, index) => (
                            <div key={index} className="bg-white rounded-3xl p-6 shadow-xl border-2 hover:shadow-2xl hover:scale-105 transition" style={{ borderColor: "#0A7EED" }}>
                                <div className="text-center space-y-4">
                                    <div className="relative inline-block">
                                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4" style={{ borderColor: "#0A7EED" }}>
                                            <Image
                                                src={person.image}
                                                alt={person.name}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
                                        <p className="text-sm text-gray-700 mb-3">{person.position}</p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedPerson(person)}
                                        className="block w-full px-4 py-3 rounded-xl text-white font-semibold transition"
                                        style={{ background: "#0A7EED" }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = "#0865C4"}
                                        onMouseLeave={(e) => e.currentTarget.style.background = "#0A7EED"}
                                    >
                                        <Phone className="w-4 h-4 inline mr-2" />
                                        {t("team.call")}
                                    </button>

                                    <p className="text-xs text-gray-700 font-mono">{person.phone}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Call Confirmation Modal */}
            {selectedPerson && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPerson(null)}>
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">{t("team.modal.title")}</h3>
                            <button
                                onClick={() => setSelectedPerson(null)}
                                className="text-gray-500 hover:text-gray-900 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="text-center mb-6">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 mb-4" style={{ borderColor: "#0A7EED" }}>
                                <Image
                                    src={selectedPerson.image}
                                    alt={selectedPerson.name}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{selectedPerson.name}</h4>
                            <p className="text-gray-700 mb-3">{selectedPerson.position}</p>
                            <p className="text-2xl font-bold" style={{ color: "#0A7EED" }}>{selectedPerson.phone}</p>
                        </div>

                        <div className="space-y-3">
                            <a
                                href={`tel:${selectedPerson.phone.replace(/\s/g, "")}`}
                                className="block w-full px-6 py-4 rounded-2xl text-white font-bold text-center transition"
                                style={{ background: "#0A7EED" }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#0865C4"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "#0A7EED"}
                            >
                                <Phone className="w-5 h-5 inline mr-2" />
                                {t("team.modal.callNow")}
                            </a>
                            <button
                                onClick={() => setSelectedPerson(null)}
                                className="block w-full px-6 py-4 rounded-2xl border-2 font-bold text-gray-900 transition hover:bg-gray-50"
                                style={{ borderColor: "#E5E7EB" }}
                            >
                                {t("team.modal.cancel")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactSection;
