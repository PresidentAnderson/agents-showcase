#!/usr/bin/env python3
"""
File Operations Agent - Automated file management and organization
"""

import os
import shutil
import hashlib
import json
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Optional, Tuple
import asyncio
import aiofiles

class FileOpsAgent:
    """Agent for automated file operations and management"""
    
    def __init__(self, base_path: str = "/mnt/f"):
        self.base_path = Path(base_path)
        self.operations_log = []
        self.dry_run = False
        
    def enable_dry_run(self):
        """Enable dry run mode - no actual changes"""
        self.dry_run = True
        print("🔸 Dry run mode enabled - no changes will be made")
    
    async def organize_by_type(self, source_dir: str, dest_dir: Optional[str] = None):
        """Organize files by their type/extension"""
        source = Path(source_dir)
        dest = Path(dest_dir) if dest_dir else source / "organized"
        
        # File type categories
        categories = {
            'documents': ['.pdf', '.doc', '.docx', '.txt', '.odt', '.xls', '.xlsx', '.ppt', '.pptx'],
            'images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.ico'],
            'videos': ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm'],
            'audio': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a'],
            'archives': ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz'],
            'code': ['.py', '.js', '.html', '.css', '.cpp', '.java', '.go', '.rs', '.sh'],
            'data': ['.json', '.xml', '.csv', '.sql', '.db', '.sqlite'],
            'configs': ['.ini', '.conf', '.config', '.env', '.yml', '.yaml', '.toml'],
            'executables': ['.exe', '.msi', '.app', '.deb', '.rpm', '.dmg', '.pkg'],
        }
        
        if not source.exists():
            print(f"❌ Source directory {source} does not exist")
            return
        
        organized_count = 0
        for file_path in source.iterdir():
            if file_path.is_file():
                ext = file_path.suffix.lower()
                category = 'misc'
                
                for cat, extensions in categories.items():
                    if ext in extensions:
                        category = cat
                        break
                
                target_dir = dest / category
                target_path = target_dir / file_path.name
                
                if not self.dry_run:
                    target_dir.mkdir(parents=True, exist_ok=True)
                    shutil.move(str(file_path), str(target_path))
                
                organized_count += 1
                self._log_operation('organize', str(file_path), str(target_path))
                print(f"✓ Moved {file_path.name} -> {category}/")
        
        print(f"\n✅ Organized {organized_count} files")
    
    async def find_duplicates(self, directory: str, delete: bool = False) -> Dict[str, List[str]]:
        """Find duplicate files based on content hash"""
        directory = Path(directory)
        file_hashes = {}
        duplicates = {}
        
        print(f"🔍 Scanning for duplicates in {directory}...")
        
        for file_path in directory.rglob('*'):
            if file_path.is_file():
                file_hash = await self._hash_file(file_path)
                
                if file_hash in file_hashes:
                    if file_hash not in duplicates:
                        duplicates[file_hash] = [file_hashes[file_hash]]
                    duplicates[file_hash].append(str(file_path))
                else:
                    file_hashes[file_hash] = str(file_path)
        
        # Report duplicates
        total_duplicates = 0
        space_wasted = 0
        
        for file_hash, file_list in duplicates.items():
            print(f"\n📎 Duplicate set (hash: {file_hash[:8]}...):")
            for file_path in file_list:
                size = Path(file_path).stat().st_size
                print(f"  - {file_path} ({self._format_size(size)})")
                if file_list.index(file_path) > 0:
                    total_duplicates += 1
                    space_wasted += size
                    
                    if delete and not self.dry_run:
                        os.remove(file_path)
                        print(f"    🗑️ Deleted")
        
        print(f"\n📊 Found {total_duplicates} duplicate files")
        print(f"💾 Space wasted: {self._format_size(space_wasted)}")
        
        return duplicates
    
    async def _hash_file(self, file_path: Path, chunk_size: int = 8192) -> str:
        """Calculate SHA256 hash of a file"""
        sha256_hash = hashlib.sha256()
        
        async with aiofiles.open(file_path, 'rb') as f:
            while chunk := await f.read(chunk_size):
                sha256_hash.update(chunk)
        
        return sha256_hash.hexdigest()
    
    async def backup_directory(self, source: str, backup_location: str, compress: bool = True):
        """Create backup of directory with optional compression"""
        source_path = Path(source)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_name = f"{source_path.name}_backup_{timestamp}"
        
        if compress:
            backup_path = Path(backup_location) / f"{backup_name}.tar.gz"
            
            if not self.dry_run:
                import tarfile
                with tarfile.open(backup_path, "w:gz") as tar:
                    tar.add(source, arcname=source_path.name)
            
            print(f"✅ Compressed backup created: {backup_path}")
        else:
            backup_path = Path(backup_location) / backup_name
            
            if not self.dry_run:
                shutil.copytree(source, backup_path)
            
            print(f"✅ Backup created: {backup_path}")
        
        self._log_operation('backup', source, str(backup_path))
        return str(backup_path)
    
    async def clean_temp_files(self, directories: List[str] = None):
        """Clean temporary files from system"""
        if directories is None:
            directories = [
                "/tmp",
                "/var/tmp",
                "~/.cache",
                "/mnt/c/Windows/Temp",
                "/mnt/c/Users/*/AppData/Local/Temp"
            ]
        
        patterns = ['*.tmp', '*.temp', '*.cache', '*.log', '~*', '.DS_Store', 'Thumbs.db']
        total_cleaned = 0
        space_freed = 0
        
        for directory in directories:
            directory = Path(directory).expanduser()
            if not directory.exists():
                continue
            
            print(f"\n🧹 Cleaning {directory}...")
            
            for pattern in patterns:
                for file_path in directory.rglob(pattern):
                    if file_path.is_file():
                        try:
                            size = file_path.stat().st_size
                            if not self.dry_run:
                                file_path.unlink()
                            total_cleaned += 1
                            space_freed += size
                            print(f"  ✓ Removed {file_path.name}")
                        except Exception as e:
                            print(f"  ⚠️ Could not remove {file_path.name}: {e}")
        
        print(f"\n✅ Cleaned {total_cleaned} files")
        print(f"💾 Space freed: {self._format_size(space_freed)}")
    
    async def monitor_directory(self, directory: str, callback=None):
        """Monitor directory for changes"""
        directory = Path(directory)
        print(f"👁️ Monitoring {directory} for changes...")
        
        # Initial snapshot
        snapshot = {}
        for file_path in directory.rglob('*'):
            if file_path.is_file():
                snapshot[str(file_path)] = file_path.stat().st_mtime
        
        try:
            while True:
                await asyncio.sleep(5)  # Check every 5 seconds
                
                current = {}
                for file_path in directory.rglob('*'):
                    if file_path.is_file():
                        current[str(file_path)] = file_path.stat().st_mtime
                
                # Check for new files
                new_files = set(current.keys()) - set(snapshot.keys())
                for file_path in new_files:
                    print(f"  📄 New file: {file_path}")
                    if callback:
                        await callback('new', file_path)
                
                # Check for deleted files
                deleted_files = set(snapshot.keys()) - set(current.keys())
                for file_path in deleted_files:
                    print(f"  🗑️ Deleted: {file_path}")
                    if callback:
                        await callback('deleted', file_path)
                
                # Check for modified files
                for file_path in set(current.keys()) & set(snapshot.keys()):
                    if current[file_path] != snapshot[file_path]:
                        print(f"  ✏️ Modified: {file_path}")
                        if callback:
                            await callback('modified', file_path)
                
                snapshot = current
                
        except KeyboardInterrupt:
            print("\n🛑 Monitoring stopped")
    
    def _format_size(self, size: int) -> str:
        """Format file size in human readable format"""
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if size < 1024.0:
                return f"{size:.2f} {unit}"
            size /= 1024.0
        return f"{size:.2f} PB"
    
    def _log_operation(self, operation: str, source: str, destination: str = None):
        """Log file operations"""
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'operation': operation,
            'source': source,
            'destination': destination
        }
        self.operations_log.append(log_entry)
    
    def save_log(self, log_file: str = "file_ops_log.json"):
        """Save operations log to file"""
        with open(log_file, 'w') as f:
            json.dump(self.operations_log, f, indent=2)
        print(f"📝 Log saved to {log_file}")


async def main():
    """Example usage"""
    agent = FileOpsAgent()
    
    # Enable dry run for testing
    agent.enable_dry_run()
    
    # Example operations
    print("🤖 File Operations Agent Demo\n")
    
    # Organize files by type
    await agent.organize_by_type("/mnt/f", "/mnt/f/DevOps/organized")
    
    # Find duplicates
    await agent.find_duplicates("/mnt/f/DevOps")
    
    # Clean temp files
    await agent.clean_temp_files(["/tmp", "~/.cache"])
    
    # Save operation log
    agent.save_log("/mnt/f/DevOps/Agents/logs/file_ops.json")


if __name__ == "__main__":
    asyncio.run(main())