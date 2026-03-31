import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Capsule + Flowing Fabric Banner Image */}
      <div className="bg-cornell-red py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-3xl animate-fabric-flow">
              <Image
                src="/images/time-capsule-fabric.png"
                alt="Colorful fabric squares flowing into a steel time capsule"
                width={800}
                height={200}
                className="w-full h-auto object-contain"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="bg-parchment-dark border-t border-warm-gray px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Image
              src="/images/cornell-tech-logo.png"
              alt="Cornell Tech"
              width={24}
              height={24}
            />
            <p className="text-xs text-text-muted italic">
              Add your square. Tell your story.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
