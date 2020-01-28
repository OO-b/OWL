package com.owl.drive.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.owl.drive.dao.DriveDao;
import com.owl.drive.dto.DriveFile;
import com.owl.drive.dto.DriveFolder;

@Service
public class DriveService {
	@Autowired
	private SqlSession sqlSession;
	public void insertDriveFolder(DriveFolder drivefolder) {
		DriveDao dao = getDriveDao();
		try {
			dao.insertFolder(drivefolder);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public List<DriveFolder> getDriveList(int projectIdx) {
		DriveDao dao = getDriveDao();
		List<DriveFolder> folders = new ArrayList<DriveFolder>();

		try {
			folders = dao.getDriveList(projectIdx);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return folders;
	}
	
	public boolean insertFile(DriveFile file) {
		DriveDao dao = getDriveDao();
		boolean result = false;
		
		try {
			result = dao.insertFile(file) > 0 ? true : false;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<DriveFile> getFolderData(int folderIdx) {
		System.out.println("in getFolderDatas service : " + folderIdx);
		DriveDao dao = getDriveDao();

		List<DriveFile> files = null;
		try {
			files = dao.getFileByFolderIdx(folderIdx);
			// get folder
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return files;
	}
	
	public boolean updateNewNameFolder(String folderName, int driveIdx) {
		boolean result = false;
		DriveDao dao = getDriveDao();
		try {
			result = dao.updateNewNameFolder(folderName, driveIdx)> 0 ? true : false;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}
	
	public boolean updateFolder(DriveFolder drivefolder) {
		boolean result = false;
		DriveDao dao = getDriveDao();
		try {
			result = dao.updateFolder(drivefolder)> 0 ? true : false;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

	
	public List<DriveFile> getTrashList(int projectIdx) {
		DriveDao dao = getDriveDao();
		List<DriveFile> trashlist = new ArrayList<DriveFile>();

		try {
			trashlist = dao.getTrashList(projectIdx);
			
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return trashlist;
		}

	public boolean deleteFileFromDrive(int driveFileIdx) {
		boolean reseult = false;
		DriveDao dao = getDriveDao();
		try {
			reseult = dao.deleteFileFromDrive(driveFileIdx) > 0 ? true : false;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return reseult;
	}
	
	
	public boolean deleteFilefromTrash(int driveFileIdx) {
		boolean reseult = false;
		DriveDao dao = getDriveDao();
		try {
			reseult = dao.deleteFileFromTrash(driveFileIdx) > 0 ? true : false;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return reseult;
	}
	
	public boolean renameFile(int driveFileIdx, String fileName) {
		boolean result =false;
		DriveDao dao = getDriveDao();

		try {
			result = dao.renameFile(driveFileIdx, fileName) > 0 ? true : false;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}

	public boolean restoreFilefromTrash(int driveFileIdx) {
		System.out.println("in restoreFilefromTrash");
		System.out.println(driveFileIdx);
		boolean reseult = false;
		DriveDao dao = getDriveDao();

		try {
			reseult = dao.restoreFilefromTrash(driveFileIdx) > 0 ? true : false;
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return reseult;
	}

	private DriveDao getDriveDao() {
		return sqlSession.getMapper(DriveDao.class);
	}
}
