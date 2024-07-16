import { Button, Range } from "@/components";
import { useCesium } from "@/context";

export const PlayerSection = ({ maxRange = 0, handleLive, handleRange }) => {
  const { isPlaying, currentPosition, setIsPlaying, isLive } = useCesium();

  return (
    <section className="p-2 flex items-center gap-4">
      <Button
        twClasses={
          "ring-2 ring-blue-600 hover:ring-offset-1 hover:ring-offset-blue-600"
        }
        label={isPlaying ? "Pause" : "Play"}
        handleClick={() => setIsPlaying(!isPlaying)}
      />

      <section className="flex flex-col items-center gap-1 w-full">
        <Range
          max={maxRange}
          value={currentPosition}
          handleChange={handleRange}
        />

        <section className="flex items-center justify-between w-full">
          <p className="text-sm text-neutral-500">
            {currentPosition}/{maxRange}
          </p>
          <Button
            label={"Live"}
            handleClick={handleLive}
            twClasses={"w-auto h-auto relative"}
          >
            {isLive && (
              <div className="w-2 h-2 rounded-full bg-red-500 flex items-center justify-center animate-pulse absolute top-1 right-2">
                <span className="w-1 h-1 rounded-full bg-red-600"></span>
              </div>
            )}
          </Button>
        </section>
      </section>
    </section>
  );
};
