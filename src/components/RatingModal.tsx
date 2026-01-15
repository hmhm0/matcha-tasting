"use client";

import { useState } from "react";
import { X, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RatingModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-primary font-medium hover:underline focus:outline-none"
      >
        Learn how we rate <ArrowRight className="ml-1 h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card p-6 shadow-2xl border border-border"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1 opacity-70 transition-opacity hover:bg-muted hover:opacity-100"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Info className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold">Our Rating System</h2>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Our taste profiles are built on community reviews using a standard 5-point scale.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/40 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-semibold text-primary">Sweetness</span>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-full w-[80%] rounded-full bg-primary" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Natural sweetness ranging from vegetal to floral notes. Higher scores indicate a smoother, less bitter profile.
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/40 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-semibold text-primary">Bitterness</span>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-full w-[40%] rounded-full bg-primary" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Astringency is key to matcha, but it should be pleasant. We rate based on the balance—not just presence.
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/40 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-semibold text-primary">Umami</span>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-full w-[90%] rounded-full bg-primary" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The savory, brothy richness characteristic of shaded tea. A hallmark of high-quality ceremonial matcha.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
                  Rated on a scale of 0 to 5 by verified purchases.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
