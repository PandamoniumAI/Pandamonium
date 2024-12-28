import { IoMdClose, IoMdMusicalNote, IoMdVolumeHigh } from 'react-icons/io';
import { GiDrumKit, GiKnifeFork } from 'react-icons/gi';
import { characterData } from '../data';

const iconMap = {
  Drum: GiDrumKit,
  Music: IoMdMusicalNote,
  Volume2: IoMdVolumeHigh,
  Utensils: GiKnifeFork
};

export function CharacterInfo({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{characterData.name}</h2>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-auto flex-grow">
          <p className="mb-4">{characterData.description}</p>
          <h3 className="text-xl font-semibold mb-2">Personality Traits</h3>
          <ul className="list-none pl-0 mb-4 space-y-2">
            {characterData.traits.map((trait, index) => {
              const IconComponent = iconMap[trait.icon];
              return (
                <li key={index} className="flex items-center">
                  <IconComponent className={`mr-2 h-4 w-4 ${trait.color}`} />
                  {trait.text}
                </li>
              );
            })}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Background</h3>
          <p>{characterData.background}</p>
        </div>
      </div>
    </div>
  );
}
