'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send, CheckCircle } from 'lucide-react';

const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string().email('Email inválido').required('El email es requerido'),
    message: Yup.string().required('El mensaje es requerido'),
});

export function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            
            // Simular envío de email
            try {
                // Aquí iría la integración con EmailJS o similar
                console.log('Form submitted:', values);
                
                // Simular delay de envío
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                setIsSubmitted(true);
            } catch (error) {
                console.error('Error sending email:', error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
            >
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                        ¡Mensaje enviado exitosamente!
                    </h3>
                    <p className="text-muted-foreground">
                        Gracias por contactarme. Te responderé pronto.
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setIsSubmitted(false);
                        formik.resetForm();
                    }}
                    variant="outline"
                >
                    Enviar otro mensaje
                </Button>
            </motion.div>
        );
    }

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contacto
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nombre</Label>
                        <input
                            id="name"
                            type="text"
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-destructive text-sm mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-destructive text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="message">Mensaje</Label>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                            {...formik.getFieldProps('message')}
                        />
                        {formik.touched.message && formik.errors.message && (
                            <p className="text-destructive text-sm mt-1">{formik.errors.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || !formik.isValid}
                        className="w-full"
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            />
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Enviar mensaje
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}