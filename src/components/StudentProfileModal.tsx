import React, { useState } from 'react';
import { UserProfile } from '../types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-surface-container flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
              🎓
            </div>
            <div>
              <h2 className="font-title-md text-title-md text-on-surface font-bold">
                Student Profile & Account
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Verified Campus Placement & ATS Portal ID
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {savedNotice && (
            <div className="p-3 bg-tertiary-container/15 text-tertiary font-label-md text-label-md rounded-lg flex items-center gap-2 border border-tertiary-container/30 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Profile updated successfully!</span>
            </div>
          )}

          {/* Student Identity Card */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold shadow-sm">
              BU
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                  {formData.name}
                </span>
                <span className="bg-primary-container text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Final Year CS
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {formData.email}
              </p>
              <p className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">
                ID: {formData.studentId} • {formData.college}
              </p>
            </div>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">
                Student ID / Roll No
              </label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                required
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">
              Institutional Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">
              College / University
            </label>
            <input
              type="text"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              required
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">
                Branch / Discipline
              </label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                required
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">
                Year of Study
              </label>
              <input
                type="text"
                value={formData.yearOfStudy}
                onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                required
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">
                Academic CGPA
              </label>
              <input
                type="text"
                value={formData.cgpa || '8.9 / 10.0'}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">
                Placement Tier
              </label>
              <input
                type="text"
                value={formData.plan}
                readOnly
                className="w-full h-10 px-3 rounded-lg bg-surface-container-high/50 text-on-surface-variant font-body-sm border border-surface-container cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">
              Target Role
            </label>
            <input
              type="text"
              value={formData.targetRole || 'Software Development Engineer (Campus & New Grad)'}
              onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-surface-container flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
