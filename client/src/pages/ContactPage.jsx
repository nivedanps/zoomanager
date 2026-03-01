import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { MapPin, Phone, Mail, Send, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [status, setStatus] = useState('');

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:5000/api/feedback', data);
            setStatus('success');
            reset();
            setTimeout(() => setStatus(''), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="py-20 animate-fade-in">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-5xl md:text-7xl font-display font-black text-gray-900 mb-6 uppercase tracking-tighter">Get in <span className="text-primary">Touch</span></h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">Have questions? We'd love to hear from you. Send us a message and our team will get back to you shortly.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Contact Info Cards */}
                <div className="lg:col-span-5 space-y-6">
                    {[
                        { icon: MapPin, title: "Our Location", detail: "123 Wildlife Ave, Zoo City, ZC 10101", color: "text-blue-500" },
                        { icon: Phone, title: "Phone Number", detail: "+1 (555) 123-4567", color: "text-green-500" },
                        { icon: Mail, title: "Email Address", detail: "info@zooverse.com", color: "text-primary" },
                    ].map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel p-8 rounded-[2rem] flex items-center gap-6 hover:translate-x-2 transition-transform duration-300 group"
                        >
                            <div className={`p-4 rounded-2xl bg-white/50 shadow-inner group-hover:scale-110 transition-transform`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</p>
                                <p className="text-gray-900 font-bold">{item.detail}</p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Mini Map */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[300px] glass-panel p-3"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459426!3d40.74847997932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                            className="w-full h-full rounded-[2rem]"
                            loading="lazy"
                        ></iframe>
                    </motion.div>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-7 glass-panel p-10 md:p-16 rounded-[3rem] shadow-2xl border-white/40"
                >
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                        <h3 className="text-3xl font-black text-gray-900">Send a Message</h3>
                    </div>

                    {status === 'success' && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/10 text-green-600 border border-green-200 p-6 rounded-2xl mb-8 flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                            <p className="font-bold">Message sent successfully! We'll be in touch soon.</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full glass-input px-6 py-4 rounded-2xl placeholder-gray-300"
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="text-red-500 text-xs ml-1 font-bold">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full glass-input px-6 py-4 rounded-2xl placeholder-gray-300"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs ml-1 font-bold">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                            <input
                                {...register("subject", { required: "Subject is required" })}
                                className="w-full glass-input px-6 py-4 rounded-2xl placeholder-gray-300"
                                placeholder="How can we help?"
                            />
                            {errors.subject && <p className="text-red-500 text-xs ml-1 font-bold">{errors.subject.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                            <textarea
                                rows="5"
                                {...register("message", { required: "Message is required" })}
                                className="w-full glass-input px-6 py-4 rounded-2xl placeholder-gray-300 resize-none"
                                placeholder="Write your message here..."
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-xs ml-1 font-bold">{errors.message.message}</p>}
                        </div>

                        <button type="submit" className="btn-premium w-full py-5 text-lg group">
                            <span>Dispatch Message</span>
                            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
