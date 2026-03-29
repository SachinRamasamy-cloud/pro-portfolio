import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const navLinks = ['Projects', 'Experience', 'Skills', 'About', 'Contact'];

    const navContainerVariants = {
        hidden: { y: -25, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0.2,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.08,
            },
        },
    };

    const navItemVariants = {
        hidden: { y: -10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 120, damping: 12 },
        },
    };

    // Variants for the mobile dropdown container
    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.3, 
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.05
            }
        },
        exit: { 
            opacity: 0,
            y: -10,
            transition: { duration: 0.2, ease: 'easeIn' }
        }
    };

    const [open, setOpen] = useState(false);


    return (
        <motion.nav
            className="bg-surface border-b sticky top-0 border-border px-6 py-4 flex justify-between items-center relative z-50"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex items-center gap-8">
                <motion.div
                    className="text-text-primary font-display text-2xl font-bold tracking-wide"
                    variants={navItemVariants}
                >
                    Sachin
                </motion.div>
                <div className="hidden md:flex text-text-secondary font-body items-center gap-6">
                    {navLinks.map(link => (
                        <motion.div
                            key={link}
                            className="hover:text-text-primary cursor-pointer"
                            variants={navItemVariants}
                            whileHover={{ y: -2, transition: { type: 'spring', stiffness: 300 } }}
                        >
                            {link}
                        </motion.div>
                    ))}
                </div>
            </div>
            <motion.button
                className="hidden md:flex bg-accent text-text-inverse font-body px-4 py-2 rounded"
                variants={navItemVariants}
                whileHover={{ scale: 1.05, backgroundColor: '#7A5F3D' /* accent-hover */ }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                Resume
            </motion.button>

            {/* Mobile Toggle Button */}
            <div className="md:hidden flex items-center">
                <motion.div
                    className="cursor-pointer text-text-primary p-2"
                    onClick={() => setOpen(!open)}
                    whileTap={{ scale: 0.9 }}
                >
                    {open ?
                    <i className="fa-solid fa-xmark text-xl"></i>
                    :
                    <i className="fa-solid fa-bars text-xl"></i>
                    }
                </motion.div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute top-full left-0 w-full bg-surface border-b border-border shadow-sm flex flex-col px-6 py-6 gap-6 md:hidden"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {navLinks.map(link => (
                            <motion.div
                                key={link}
                                className="text-text-secondary font-body hover:text-text-primary cursor-pointer text-lg"
                                variants={navItemVariants}
                                onClick={() => setOpen(false)} // Close menu when a link is clicked
                            >
                                {link}
                            </motion.div>
                        ))}
                        <motion.button
                            className="bg-accent text-text-inverse font-body px-4 py-3 rounded mt-2 w-full text-center"
                            variants={navItemVariants}
                            whileTap={{ scale: 0.95 }}
                        >
                            Resume
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
